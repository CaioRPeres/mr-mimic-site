# Divide o mimic-oficial.css em:
#   core  -> campo "Edição avançada de CSS" da Nuvemshop (limite 50.000 caracteres)
#   extra -> regras de elementos que só existem quando os nossos scripts rodam (.mm-*, .mmh-*, #mm-*);
#            vão embutidas no mm.js, chegam junto com os elementos (sem piscar)
import re, sys
def minify(s):
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.S)
    # texto entre aspas (content:"Pix, cartão") sai intacto: guarda, minifica o resto, devolve
    cofre = []
    def guarda(m):
        cofre.append(m.group(0)); return '\x00%d\x00' % (len(cofre) - 1)
    s = re.sub(r'"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'', guarda, s)
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'\s*([{};,>])\s*', r'\1', s)   # + e ~ ficam com espaço (calc() precisa)
    s = re.sub(r';}', '}', s)
    s = re.sub(r'\x00(\d+)\x00', lambda m: cofre[int(m.group(1))], s)
    return s.strip()
def blocks(s):
    """lista de (prelude, corpo) no nível de cima; corpo de @media vem bruto"""
    out, i, n = [], 0, len(s)
    while i < n:
        j = s.find('{', i)
        if j < 0: break
        pre = s[i:j].strip(); d = 1; k = j + 1
        while d and k < n:
            d += {'{': 1, '}': -1}.get(s[k], 0); k += 1
        out.append((pre, s[j+1:k-1])); i = k
    return out
MM = re.compile(r'(\.mmh?-|#mm-|\.mm_)')
HOV = re.compile(r':(hover|focus|focus-visible|active)')   # estado de interação não pinta na carga
SANIT = re.compile(r':has\(|::-webkit-|~')   # a Nuvemshop apaga regras com isto ao salvar o campo de CSS (visto em 06/10/2026)
def is_extra(sel):
    if SANIT.search(sel):
        return True
    parts = [p for p in re.split(r',(?![^(]*\))', sel) if p.strip()]
    return bool(parts) and all(MM.search(p) or HOV.search(p) for p in parts)
def tight(s):
    s = re.sub(r'(?<![\w.#-])0\.(\d)', r'.\1', s)                                   # 0.5 -> .5
    s = re.sub(r'#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3\b', r'#\1\2\3', s)   # #ffcc00 -> #fc0
    return s.replace(' !important', '!important')
def split(css):
    core, extra = [], []
    head = re.match(r'^(@import[^;]+;)+', css)
    if head: core.append(head.group(0)); css = css[head.end():]
    for pre, body in blocks(css):
        if pre.startswith('@media') or pre.startswith('@supports'):
            c, e = split_rules(body)
            if c: core.append(pre + '{' + c + '}')
            if e: extra.append(pre + '{' + e + '}')
        elif pre.startswith('@'):
            core.append(pre + '{' + body + '}')
        else:
            (extra if is_extra(pre) else core).append(pre + '{' + body + '}')
    return ''.join(core), ''.join(extra)
def split_rules(body):
    c, e = [], []
    for pre, b in blocks(body):
        (e if is_extra(pre) else c).append(pre + '{' + b + '}')
    return ''.join(c), ''.join(e)
if __name__ == '__main__':
    src, base = sys.argv[1], sys.argv[2]
    css = tight(minify(open(src).read()))
    css = css.replace("url('logo-branco.png')", "url('" + base + "assets/logo-oficial.png')")
    css = css.replace("url('logo-v5.png')", "url('" + base + "assets/logo-oficial.png')")
    css = css.replace("url('logo-oficial.png')", "url('" + base + "assets/logo-oficial.png')")
    core, extra = split(css)
    open('dist/mm-core.css', 'w').write(core)
    open('dist/mm-extra.css', 'w').write(extra)
    print('total', len(css), 'core', len(core), 'extra', len(extra))
    assert len(core) <= 48000, 'core passou de 48 mil caracteres (limite da Nuvemshop 50 mil)'
