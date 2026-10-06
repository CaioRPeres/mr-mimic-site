# Teste local: abre a loja REAL (mrmimic.com.br) com o nosso CSS e o mm.js injetados como a Nuvemshop vai fazer
# (CSS avançado no <head>, código externo no fim do <body>). Nada é gravado na loja.
#   python3 proxy_teste.py  ->  http://127.0.0.1:8740/
import http.server, urllib.request, os, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
LOJA = 'https://mrmimic.com.br'
class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_GET(self):
        if self.path.startswith('/mm/'):
            f = os.path.join(AQUI, self.path[4:].split('?')[0])
            if not os.path.isfile(f): return self.send_error(404)
            tipo = {'.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg'}.get(os.path.splitext(f)[1], 'application/octet-stream')
            b = open(f, 'rb').read()
        else:
            try:
                r = urllib.request.urlopen(urllib.request.Request(LOJA + self.path, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30)
            except urllib.error.HTTPError as e:
                r = e
            tipo = r.headers.get('Content-Type', 'text/html'); b = r.read()
            if 'html' in tipo:
                t = b.decode('utf-8', 'replace').replace(LOJA + '/', '/')
                core = open(os.path.join(AQUI, 'dist', 'mm-core.css')).read()
                t = t.replace('</head>', '<style id="mm-core">' + core + '</style></head>', 1)
                i = t.rfind('</body>')
                t = t[:i] + '<script src="/mm/dist/mm.js"></script>' + t[i:]
                b = t.encode()
        self.send_response(200); self.send_header('Content-Type', tipo); self.send_header('Content-Length', str(len(b)))
        self.send_header('Cache-Control', 'no-store'); self.end_headers(); self.wfile.write(b)
http.server.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 8740), H).serve_forever()
