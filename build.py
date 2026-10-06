# Monta o tema da prévia para a loja real (mrmimic.com.br, Nuvemshop, tema Morelia).
#
#   dist/mm-core.css  -> colar em Loja online > Layout > Editar layout atual > "Edição de css avançada"
#                        (textarea #text-css_code, limite 58.000 caracteres)
#   dist/mm.js        -> carregado por UMA linha no campo do tema
#                        Editar layout > Rodapé da página > Selos personalizados > "Código HTML ou Javascript do selo"
#                        (textarea #text-custom_seal_code; "Configurações > Códigos externos" NÃO tem campo de JS livre):
#                        <script src="https://cdn.jsdelivr.net/gh/CaioRPeres/mr-mimic-site@<commit>/dist/mm.js"></script>
#   assets/           -> imagens usadas pelos scripts e pelo CSS (servidas pelo jsDelivr junto com o mm.js)
#
# Publicar uma mudança: mexer na prévia -> python3 build.py <base com o commit ATUAL da loja> -> git commit + push
#   -> trocar o <commit> da linha do selo pelo novo -> "Publicar alterações". Se o CSS mudou, colar de novo o mm-core.css.
#   URL presa ao commit = arquivo imutável, sem risco de cache velho no navegador do cliente.
#
# Fonte: ../previa-html/*.js e ../mimic-oficial.css (a prévia continua sendo onde se mexe).
# Uso:   python build.py <base>     base = URL da pasta do repositório no jsDelivr, terminando em "/"
import os, re, sys, json, shutil, subprocess
from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
PREV = os.path.join(AQUI, '..', 'previa-html')
BASE = sys.argv[1] if len(sys.argv) > 1 else 'https://cdn.jsdelivr.net/gh/CaioRPeres/mr-mimic-site@main/'
os.makedirs(os.path.join(AQUI, 'dist'), exist_ok=True)

# ---------- imagens ----------
PNG_WEBP = ['hero/p1-v6.png', 'hero/p2.png', 'hero/p3.png', 'hero/p4.png', 'hero/p5-moedas2.png',
            'hero/luz-hero-1.png', 'hero/luz-hero-2.png', 'hero/luz-hero-3.png', 'hero/luz-hero-4.png',
            'hero/luz-hero-5-ouro.png', 'hero/luz-hero-6.png']
COPIA = ['hero/banner-rdelta.jpg', 'hero/banner-rdelta-cel.jpg',
         'img-jp/pikachu-ex-234-193-mega-dream-ex-jp-ilustracao-secreta.jpg',
         'img-prod/booster-display-me05-escuridao-absoluta-pt-36-boosters-1.webp',
         'img-prod/pasta-premium-colors-3x3-bra-roxa-azul-s-caixa-1.webp',
         'img-prod/sleeve-basico-duplo-cards-bra-transparente-200-unidades-1.webp',
         'img-prod/toploader-cristal-bra-25-unidades-1.webp',
         'img-prod/case-magnetico-4mm-cards-bra-unitario-1.webp']
for f in PNG_WEBP:
    d = os.path.join(AQUI, 'assets', f[:-4] + '.webp'); os.makedirs(os.path.dirname(d), exist_ok=True)
    s = os.path.join(PREV, f)
    if not os.path.exists(d) or os.path.getmtime(d) < os.path.getmtime(s):
        Image.open(s).save(d, 'WEBP', quality=86, method=6)
for f in COPIA:
    d = os.path.join(AQUI, 'assets', f); os.makedirs(os.path.dirname(d), exist_ok=True)
    shutil.copy2(os.path.join(PREV, f), d)
shutil.copy2(os.path.join(PREV, 'logo-oficial.png'), os.path.join(AQUI, 'assets', 'logo-oficial.png'))

# ---------- CSS ----------
subprocess.run([sys.executable, os.path.join(AQUI, 'split_css.py'), os.path.join(AQUI, '..', 'mimic-oficial.css'), BASE],
               check=True, cwd=AQUI)
extra = open(os.path.join(AQUI, 'dist', 'mm-extra.css')).read()

# ---------- scripts ----------
URLS = {'catalogo.html': '/cartas-avulsas/', 'pokemon-tcg.html': '/pokemon-tcg/',
        'acessorios.html': '/acessorios/', 'venda-suas-cartas.html': '/venda-suas-cartas/'}
HOME = 'if (!document.querySelector(\'[data-store^="home-"]\')) return;'

def troca(txt, de, para, n=None, nome=''):
    c = txt.count(de)
    assert c and (n is None or c == n), f'{nome}: esperava {n or ">=1"} de {de!r}, achei {c}'
    return txt.replace(de, para)

def webp(m):  # "hero/x.png?s=2" -> MM_A+"hero/x.webp"
    return 'MM_A+"' + m.group(1) + '.webp"'

def le(nome):
    return open(os.path.join(PREV, nome)).read()

# Os preços que aparecem no texto do hero vêm da loja no ar (conferidos em 06/10/2026, páginas de categoria).
hero = le('hero2.js')
hero = troca(hero, '(function () {\n', '(function () {\n  ' + HOME + '\n', 1, 'hero2')
hero = re.sub(r'"(hero/[^"?]+)\.png(\?[^"]*)?"', webp, hero)
hero = re.sub(r'"(hero/[^"?]+\.jpg)(\?[^"]*)?"', r'MM_A+"\1"', hero)
hero = troca(hero, 'a partir de R$ 69,99', 'a partir de R$ 89,90', 1, 'hero2')
hero = troca(hero, 'R$ 449,90 · em até 12x', 'R$ 449,90 · lacrado, em português', 1, 'hero2')
hero = troca(hero, 'a partir de R$ 1,00', 'a partir de R$ 4,90', 1, 'hero2')
# a loja real não tem carrossel: o hero entra no lugar da mensagem de boas-vindas (que repete o hero)
hero = troca(hero, 'else document.body.prepend(sec);',
             'else { const bv = document.querySelector(\'[data-store="home-welcome-message"]\') || document.querySelector(\'[data-store^="home-"]\');'
             ' const alvo = bv.closest("section") || bv; alvo.parentElement.insertBefore(sec, alvo);'
             ' if (bv.matches(\'[data-store="home-welcome-message"]\')) alvo.style.display = "none"; }', 1, 'hero2')

cats = le('home-categorias.js')
cats = troca(cats, '(function () {\n', '(function () {\n  ' + HOME + '\n', 1, 'home-categorias')
cats = re.sub(r'img:"((img-jp|img-prod)/[^"]+)"', r'img:MM_A+"\1"', cats)
# loja real: "Destaques" vem em GRADE (sem swiper); vira carrossel clonando a fileira de baixo (ainda não iniciada pelo tema)
cats = troca(cats, '  if (secs.length < 2) return;\n', '''  if (secs.length < 2) return;
  if (!secs[0].querySelector(".swiper-container") && secs[1].querySelector(".swiper-container")) {
    const g = secs[0], c = secs[1].cloneNode(true);
    c.querySelectorAll("*").forEach(e => { if (typeof e.className === "string" && /js-swiper-new|js-products-new/.test(e.className)) e.className = e.className.replace(/js-swiper-new/g, "js-swiper-feat").replace(/js-products-new/g, "js-products-feat"); });
    const cc = c.querySelector(".swiper-container"); cc.className = "js-swiper-feat swiper-container"; cc.removeAttribute("style");
    const wc = cc.querySelector(".swiper-wrapper"); wc.innerHTML = ""; wc.removeAttribute("style");
    c.dataset.mmClone = "1"; c.style.order = getComputedStyle(g).order;
    g.parentElement.insertBefore(c, g); g.style.display = "none"; secs[0] = c;
  }
''', 1, 'home-categorias')
cats = troca(cats, 'const ok = secs.every(s => (s.querySelector(".swiper-container")||{}).swiper);',
             'const ok = secs.filter(s => !s.dataset.mmClone).every(s => (s.querySelector(".swiper-container")||{}).swiper);', 1, 'home-categorias')
# na loja cada fileira se completa com até 8 da categoria
cats = troca(cats, '[["catalogo.html", 6]]', '[["catalogo.html", 8]]', 1, 'home-categorias')
cats = troca(cats, '[["pokemon-tcg.html", 7]]', '[["pokemon-tcg.html", 8]]', 1, 'home-categorias')

prod = le('produto.js')
prod = troca(prod, 'const previa = /^(127\\.0\\.0\\.1|localhost)$/.test(location.hostname);', 'const previa = false;', 1, 'produto')
prod = troca(prod, '"https://mrmimic.com.br/" + i.img', 'MM_A + i.img', 1, 'produto')

venda = le('venda.js')
venda = troca(venda, '(function () {\n', '(function () {\n  if (!/^\\/venda-suas-cartas\\/?$/.test(location.pathname)) return;\n', 1, 'venda')
venda = troca(venda, 'const base = previa ? "" : "https://mrmimic.com.br/";', 'const base = MM_A;', 1, 'venda')
venda = re.sub(r'\$\{base\}(hero/[^"?]+)\.png(\?[^"]*)?', r'${base}\1.webp', venda)

partes = [('hero2.js', hero), ('home-categorias.js', cats), ('cor-card.js', le('cor-card.js')),
          ('produto.js', prod), ('redes.js', le('redes.js')), ('venda.js', venda)]
saida = []
for nome, txt in partes:
    for de, para in URLS.items():
        txt = txt.replace('"' + de + '"', '"' + para + '"').replace("'" + de + "'", "'" + para + "'")
    saida.append(f'/* ===== {nome} ===== */\ntry {{\n{txt}\n}} catch (e) {{ console.warn("mm {nome}", e); }}\n')

prel = ('/* Mr. Mimic: scripts do tema na loja real. GERADO por loja-real/build.py a partir de previa-html/; nao editar aqui. */\n'
        '(function () {\n'
        '  var me = (document.currentScript && document.currentScript.src) || "";\n'
        '  window.MM_BASE = me ? me.replace(/dist\\/[^\\/]*$/, "") : ' + json.dumps(BASE) + ';\n'
        '  window.MM_A = window.MM_BASE + "assets/";\n'
        '  if (!document.getElementById("mm-extra")) { var st = document.createElement("style"); st.id = "mm-extra";\n'
        '    st.textContent = ' + json.dumps(extra) + ';\n'
        '    document.head.appendChild(st); }\n'
        '})();\n')
js = prel + '\n'.join(saida)
open(os.path.join(AQUI, 'dist', 'mm.js'), 'w').write(js)
# o que ainda aponta para a prévia não pode sobrar
sobra = re.findall(r'["\'][\w-]+\.html["\']', js) + re.findall(r'(?<!MM_A\+)"hero/[^"]+"', js)
assert not sobra, f'caminhos da prévia sobrando no mm.js: {sobra[:5]}'
print('mm.js', len(js), 'bytes;', 'assets', sum(len(f) for _, _, f in os.walk(os.path.join(AQUI, 'assets'))), 'arquivos')
