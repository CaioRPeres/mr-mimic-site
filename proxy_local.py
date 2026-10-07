"""Prévia: abre a loja real com o build LOCAL, sem publicar nada.

    python3 proxy_local.py [porta]      (padrão 8742)

http://127.0.0.1:8742/                 a loja no ar, com o dist/mm.js e o dist/mm-core.css locais no lugar dos publicados
http://127.0.0.1:8742/__cel?p=/rota    a mesma página numa moldura de celular de 390 px
                                       (a loja proíbe iframe de outro site, por isso a moldura só funciona por aqui)
"""
import http.server
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

LOJA = 'https://mrmimic.com.br'
RAIZ = os.path.dirname(os.path.abspath(__file__))
PORTA_PADRAO = 8742

MOLDURA_CELULAR = '''<!doctype html><meta charset="utf-8"><title>celular</title><style>body{margin:0;background:#222;display:flex;justify-content:center;padding:10px}
iframe{width:390px;height:700px;border:6px solid #000;border-radius:28px;background:#fff}</style><iframe id="f" src="%s"></iframe>'''
TIPOS = {'.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg'}

SCRIPT_PUBLICADO = re.compile(r'https://cdn\.jsdelivr\.net/gh/CaioRPeres/mr-mimic-site@[0-9a-f]+/dist/mm\.js')
# o CSS colado no admin chega num <style> que começa com o @import das fontes
CSS_PUBLICADO = re.compile(r'<style[^>]*>\s*@import url\("https://fonts\.googleapis\.com/css2\?family=Londrina.*?</style>', re.S)


def pagina_da_loja(caminho):
    try:
        resposta = urllib.request.urlopen(urllib.request.Request(LOJA + caminho, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30)
    except urllib.error.HTTPError as erro:   # 404 e afins também passam, com o corpo da loja
        resposta = erro
    return resposta.headers.get('Content-Type', 'text/html'), resposta.read()


def trocar_pelo_local(html):
    html = html.replace(LOJA + '/', '/')
    html = SCRIPT_PUBLICADO.sub('/mm/dist/mm.js', html)
    with open(os.path.join(RAIZ, 'dist', 'mm-core.css'), encoding='utf-8') as f:
        core = f.read()
    return CSS_PUBLICADO.sub(lambda m: '<style>' + core + '</style>', html, count=1)


class Previa(http.server.BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        if self.path.startswith('/__cel'):
            consulta = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            tipo, corpo = 'text/html; charset=utf-8', (MOLDURA_CELULAR % consulta.get('p', ['/'])[0]).encode()
        elif self.path.startswith('/mm/'):   # arquivos do repositório (dist/ e assets/)
            arquivo = os.path.join(RAIZ, self.path[4:].split('?')[0])
            if not os.path.isfile(arquivo):
                return self.send_error(404)
            tipo = TIPOS.get(os.path.splitext(arquivo)[1], 'application/octet-stream')
            with open(arquivo, 'rb') as f:
                corpo = f.read()
        else:
            tipo, corpo = pagina_da_loja(self.path)
            if 'html' in tipo:
                corpo = trocar_pelo_local(corpo.decode('utf-8', 'replace')).encode()
        self.send_response(200)
        self.send_header('Content-Type', tipo)
        self.send_header('Content-Length', str(len(corpo)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(corpo)


if __name__ == '__main__':
    porta = int(sys.argv[1]) if len(sys.argv) > 1 else PORTA_PADRAO
    print(f'prévia em http://127.0.0.1:{porta}/  (celular: http://127.0.0.1:{porta}/__cel?p=/)')
    http.server.ThreadingHTTPServer(("127.0.0.1", porta), Previa).serve_forever()
