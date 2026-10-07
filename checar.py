"""Confere o build antes de publicar.

    python3 checar.py           confere o dist/ e as imagens que os scripts pedem (segundos)
    python3 checar.py --loja    também abre a loja com o build local no Chrome sem janela
                                e confere, página por página, o que cada script montou (~1 min)

Sai com código 1 se alguma conferência falhar.
"""
import http.server
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import urllib.request

import css as tema_css
import css_mortas
import proxy_local

RAIZ = os.path.dirname(os.path.abspath(__file__))
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
falhas = []


def conferir(ok, mensagem):
    print(('  ok    ' if ok else '  FALHA ') + mensagem)
    if not ok:
        falhas.append(mensagem)


def ler(*caminho):
    with open(os.path.join(RAIZ, *caminho), encoding='utf-8') as f:
        return f.read()


# ---------- arquivos ----------

def conferir_dist():
    print('dist/')
    mais_novo_do_src = max(os.path.getmtime(os.path.join(d, f)) for d, _, fs in os.walk(os.path.join(RAIZ, 'src')) for f in fs)
    conferir(os.path.getmtime(os.path.join(RAIZ, 'dist', 'mm.js')) >= mais_novo_do_src, 'build feito depois da última mudança em src/')
    core = ler('dist', 'mm-core.css')
    conferir(len(core) <= tema_css.LIMITE_CORE, f'mm-core.css com {len(core)} caracteres (limite {tema_css.LIMITE_CORE})')
    conferir(not tema_css.APAGADO_PELA_NUVEMSHOP.search(re.sub(r'\{[^{}]*\}', '{}', core)),
             'mm-core.css sem :has( / ~ / ::-webkit- em seletor (a Nuvemshop apagaria)')
    _, mortas = css_mortas.analisar(ler('src', 'css', 'tema.css'))
    conferir(not mortas, f'tema.css sem declaração sobrescrita pelo mesmo seletor ({len(mortas)}; "python3 css_mortas.py" lista, "--limpar" tira)')
    if shutil.which('node'):
        r = subprocess.run(['node', '--check', os.path.join(RAIZ, 'dist', 'mm.js')], capture_output=True, text=True)
        conferir(r.returncode == 0, 'mm.js sem erro de sintaxe' + ('' if r.returncode == 0 else ': ' + r.stderr.strip()[:200]))


def conferir_imagens():
    print('assets/')
    pedidas = set()
    for nome in os.listdir(os.path.join(RAIZ, 'src', 'js')):
        pedidas |= set(re.findall(r'MM\.asset\("([^"]+)"\)', ler('src', 'js', nome)))
    hero = ler('src', 'js', 'hero.js')   # o slider monta o nome: hero/<banner>.webp e hero/<banner>-cel.webp
    for banner in re.findall(r'banner: "([^"]+)"', hero):
        pedidas |= {f'hero/{banner}.webp', f'hero/{banner}-cel.webp'}
    faltando = sorted(p for p in pedidas if not os.path.isfile(os.path.join(RAIZ, 'assets', p)))
    conferir(not faltando, f'{len(pedidas)} imagens pedidas pelos scripts existem' + (f'; faltam: {faltando}' if faltando else ''))


def conferir_publicacao():
    print('publicação')
    try:
        html = urllib.request.urlopen(urllib.request.Request(proxy_local.LOJA + '/', headers={'User-Agent': 'Mozilla/5.0'}), timeout=20).read().decode()
        no_ar = re.search(r'mr-mimic-site@([0-9a-f]{7,40})/dist/mm\.js', html)
        no_ar = no_ar.group(1) if no_ar else None
    except OSError:
        no_ar = None
    head = subprocess.run(['git', 'rev-parse', 'HEAD'], cwd=RAIZ, capture_output=True, text=True).stdout.strip()
    pendente = subprocess.run(['git', 'status', '--porcelain', 'dist'], cwd=RAIZ, capture_output=True, text=True).stdout.strip()
    print(f'  no ar: {no_ar[:7] if no_ar else "?"} | último commit: {head[:7]} | dist/ ' + ('com mudança não commitada' if pendente else 'commitado'))


# ---------- loja no navegador ----------

AVISOS = '''<script>window.__mmAvisos=[];(function(w){console.warn=function(){var a=[].slice.call(arguments);
if(String(a[0]).indexOf("mm ")===0)window.__mmAvisos.push(a.map(String).join(" "));return w.apply(console,a);};})(console.warn);</script>'''
SONDA = r'''<script>window.addEventListener("load",function(){setTimeout(function(){
var q=function(s){return document.querySelectorAll(s)};
var quebradas=[].filter.call(q('[class^="mm"] img, img[class^="mm"]'),function(i){return i.getAttribute("src")&&i.complete&&!i.naturalWidth}).length;
var r={titulo:document.title, avisos:window.__mmAvisos, quebradas:quebradas, slides:q(".mm-hero .mmh-slide").length,
 categorias:q(".mm-cats a.tile").length, fileiras:q(".mm-verttudo").length, rodape:q(".mm-redes .mm-rede").length,
 venda:q(".mm-venda section").length, subtitulo:q("h1.js-product-name .mm-sub").length,
 precos:[].map.call(q(".mm-proteja .mm-prot-preco"),function(e){return e.offsetParent?e.textContent.trim():"oculto"})};
var s=document.createElement("script");s.type="application/json";s.id="mm-sonda";s.textContent=JSON.stringify(r);document.body.appendChild(s);
},5000)});</script>'''


class PreviaComSonda(proxy_local.Previa):
    def do_GET(self):
        if self.path.startswith('/mm/') or self.path.startswith('/__cel'):
            return super().do_GET()
        tipo, corpo = proxy_local.pagina_da_loja(self.path)
        if 'html' in tipo:
            html = proxy_local.trocar_pelo_local(corpo.decode('utf-8', 'replace'))
            corpo = html.replace('<head>', '<head>' + AVISOS, 1).replace('</body>', SONDA + '</body>', 1).encode()
        self.send_response(200)
        self.send_header('Content-Type', tipo)
        self.send_header('Content-Length', str(len(corpo)))
        self.end_headers()
        self.wfile.write(corpo)


def abrir(porta, caminho, largura=1440):
    perfil = tempfile.mkdtemp(prefix='mm-chrome-')
    try:
        dom = subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-first-run', '--user-data-dir=' + perfil,
                              f'--window-size={largura},900', '--virtual-time-budget=12000', '--dump-dom',
                              f'http://127.0.0.1:{porta}{caminho}'], capture_output=True, text=True, timeout=120).stdout
    finally:
        shutil.rmtree(perfil, ignore_errors=True)
    m = re.search(r'<script type="application/json" id="mm-sonda">(.*?)</script>', dom, re.S)
    return json.loads(m.group(1)) if m else None


def uma_carta():
    html = urllib.request.urlopen(urllib.request.Request(proxy_local.LOJA + '/cartas-avulsas/', headers={'User-Agent': 'Mozilla/5.0'}), timeout=20).read().decode()
    return re.search(r'href="(?:https://mrmimic\.com\.br)?(/produtos/[^"]+/)"', html).group(1)


def conferir_loja():
    print('loja com o build local (Chrome sem janela)')
    if not os.path.exists(CHROME):
        conferir(False, 'Chrome não encontrado em ' + CHROME)
        return
    servidor = http.server.ThreadingHTTPServer(('127.0.0.1', 0), PreviaComSonda)
    threading.Thread(target=servidor.serve_forever, daemon=True).start()
    porta = servidor.server_address[1]
    carta = uma_carta()
    # (caminho, largura, o que tem que estar lá)
    casos = [
        ('/', 1440, lambda r: r['slides'] == 6 and r['categorias'] == 6 and r['fileiras'] == 3 and r['titulo'].startswith('Mr. Mimic |')),
        ('/', 390, lambda r: r['slides'] == 6 and r['fileiras'] == 3),
        ('/venda-suas-cartas/', 1440, lambda r: r['venda'] >= 5),
        ('/contato/', 1440, lambda r: r['titulo'].startswith('Contato |')),
        ('/produtos/', 1440, lambda r: r['titulo'].startswith('Todos os Produtos')),
        (carta, 1440, lambda r: r['subtitulo'] == 1 and len(r['precos']) == 3 and all(p.startswith('R$') for p in r['precos'])),
    ]
    for caminho, largura, esperado in casos:
        r = abrir(porta, caminho, largura)
        nome = f'{caminho} ({largura}px)'
        if r is None:
            conferir(False, nome + ': a página não terminou de carregar')
            continue
        conferir(esperado(r) and r['rodape'] >= 2, nome + ': scripts montaram o esperado' + ('' if esperado(r) else f' -> {r}'))
        conferir(not r['avisos'], nome + ': nenhum script falhou' + (f' -> {r["avisos"]}' if r['avisos'] else ''))
        conferir(r['quebradas'] == 0, nome + f': nenhuma imagem quebrada ({r["quebradas"]})')
    servidor.shutdown()


if __name__ == '__main__':
    conferir_dist()
    conferir_imagens()
    conferir_publicacao()
    if '--loja' in sys.argv:
        conferir_loja()
    print('\n' + ('tudo certo' if not falhas else f'{len(falhas)} falha(s)'))
    sys.exit(1 if falhas else 0)
