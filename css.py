"""Minifica o CSS do tema e o divide em duas partes.

core  -> vai colado no admin da Nuvemshop, campo "Edição de css avançada" (limite de 50 mil caracteres).
extra -> vai embutido no mm.js, que o injeta num <style id="mm-extra">. Ficam aqui:
         - as regras de elementos que só existem quando os nossos scripts rodam (.mm-*, .mmh-*, #mm-*),
           que assim chegam junto com os elementos;
         - as de estado de interação (:hover, :focus...), que não pintam nada na carga;
         - as que a Nuvemshop APAGA ao salvar o campo de CSS: seletor com :has(, com o combinador ~
           ou com ::-webkit- (visto em 06/10/2026).

A Nuvemshop também apaga, no campo, algumas PROPRIEDADES (qualquer -webkit-*, aspect-ratio,
text-underline-offset, scrollbar-width, display:-webkit-box). Declaração assim numa regra que vai para o
core nunca vale na loja: para valer, ela precisa estar numa regra que vá para o mm.js.
"""
import re

LIMITE_CORE = 48000   # margem abaixo dos 50 mil do campo

DO_SCRIPT = re.compile(r'(\.mmh?-|#mm-|\.mm_)')
INTERACAO = re.compile(r':(hover|focus|focus-visible|active)')
APAGADO_PELA_NUVEMSHOP = re.compile(r':has\(|::-webkit-|~')
PROPRIEDADE_APAGADA = re.compile(r'^(-webkit-[a-z-]+|aspect-ratio|text-underline-offset|scrollbar-width)$', re.I)
IMPORTS = re.compile(r'^(@import\s*url\([^)]*\)[^;]*;)+')   # a URL das fontes tem ; dentro (wght@400;900)


def minificar(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    # texto entre aspas (content:"Pix, cartão") sai intacto: guarda, minifica o resto, devolve
    cofre = []

    def guardar(m):
        cofre.append(m.group(0))
        return '\x00%d\x00' % (len(cofre) - 1)

    css = re.sub(r'"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'', guardar, css)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{};,>])\s*', r'\1', css)   # + e ~ ficam com espaço (o calc() precisa)
    css = re.sub(r';}', '}', css)
    css = re.sub(r'\x00(\d+)\x00', lambda m: cofre[int(m.group(1))], css)
    return css.strip()


def encurtar(css):
    css = re.sub(r'(?<![\w.#-])0\.(\d)', r'.\1', css)                                   # 0.5 -> .5
    css = re.sub(r'#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3\b', r'#\1\2\3', css)   # #ffcc00 -> #fc0
    return css.replace(' !important', '!important')


def blocos(css):
    """Lista de (seletor ou @regra, corpo) no nível de cima; o corpo de um @media vem inteiro."""
    saida, i, n = [], 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        cabeca, nivel, k = css[i:j].strip(), 1, j + 1
        while nivel and k < n:
            nivel += {'{': 1, '}': -1}.get(css[k], 0)
            k += 1
        saida.append((cabeca, css[j + 1:k - 1]))
        i = k
    return saida


def apagada_no_admin(propriedade, valor):
    """Declaração que a Nuvemshop tira ao salvar o campo de CSS (comparado com o que ficou no ar em 06/10/2026)."""
    return bool(PROPRIEDADE_APAGADA.match(propriedade.strip())) or '-webkit-box' in valor


def vai_para_extra(seletor):
    if APAGADO_PELA_NUVEMSHOP.search(seletor):
        return True
    partes = [p for p in re.split(r',(?![^(]*\))', seletor) if p.strip()]
    return bool(partes) and all(DO_SCRIPT.search(p) or INTERACAO.search(p) for p in partes)


def _separar_regras(corpo):
    core, extra = [], []
    for seletor, regras in blocos(corpo):
        (extra if vai_para_extra(seletor) else core).append(seletor + '{' + regras + '}')
    return ''.join(core), ''.join(extra)


def dividir(css):
    """CSS já minificado -> (core, extra), mantendo a ordem das regras dentro de cada parte."""
    core, extra = [], []
    imports = IMPORTS.match(css)
    if imports:
        core.append(imports.group(0))
        css = css[imports.end():]
    for cabeca, corpo in blocos(css):
        if cabeca.startswith(('@media', '@supports')):
            c, e = _separar_regras(corpo)
            if c:
                core.append(cabeca + '{' + c + '}')
            if e:
                extra.append(cabeca + '{' + e + '}')
        elif cabeca.startswith('@'):
            core.append(cabeca + '{' + corpo + '}')
        else:
            (extra if vai_para_extra(cabeca) else core).append(cabeca + '{' + corpo + '}')
    return ''.join(core), ''.join(extra)
