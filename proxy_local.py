# Repassa a loja real, mas troca o mm.js publicado pelo mm.js LOCAL (loja-real/dist) para testar antes de publicar.
# /__cel?p=/caminho mostra a pagina numa moldura de celular (390 px).
import http.server, urllib.request, urllib.parse, sys, os, re
LOJA = 'https://mrmimic.com.br'
RAIZ = os.path.expanduser('~/MrMimic/Mr Mimic Site/loja-real')
CEL = '''<!doctype html><meta charset="utf-8"><title>celular</title><style>body{margin:0;background:#222;display:flex;justify-content:center;padding:10px}
iframe{width:390px;height:700px;border:6px solid #000;border-radius:28px;background:#fff}</style><iframe id="f" src="%s"></iframe>'''
TIPOS = {'.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg'}
class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_GET(self):
        if self.path.startswith('/__cel'):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            b = (CEL % q.get('p', ['/'])[0]).encode(); tipo = 'text/html; charset=utf-8'
        elif self.path.startswith('/mm/'):
            f = os.path.join(RAIZ, self.path[4:].split('?')[0])
            if not os.path.isfile(f): return self.send_error(404)
            tipo = TIPOS.get(os.path.splitext(f)[1], 'application/octet-stream'); b = open(f, 'rb').read()
        else:
            try:
                r = urllib.request.urlopen(urllib.request.Request(LOJA + self.path, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30)
            except urllib.error.HTTPError as e:
                r = e
            tipo = r.headers.get('Content-Type', 'text/html'); b = r.read()
            if 'html' in tipo:
                t = b.decode('utf-8', 'replace').replace(LOJA + '/', '/')
                t = re.sub(r'https://cdn\.jsdelivr\.net/gh/CaioRPeres/mr-mimic-site@[0-9a-f]+/dist/mm\.js', '/mm/dist/mm.js', t)
                b = t.encode()
        self.send_response(200); self.send_header('Content-Type', tipo); self.send_header('Content-Length', str(len(b)))
        self.send_header('Cache-Control', 'no-store'); self.end_headers(); self.wfile.write(b)
http.server.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 8742), H).serve_forever()
