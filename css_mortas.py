"""Acha (e tira) declarações do tema.css que nunca valem.

    python3 css_mortas.py            lista as declarações mortas
    python3 css_mortas.py --limpar   tira todas do src/css/tema.css, preservando comentários e formato

Uma declaração está morta quando, para CADA seletor da lista dela, existe outra declaração com o mesmo
seletor, no mesmo contexto (@media idêntico ou nenhum), da mesma propriedade (ou de um atalho que a inclui,
como "border" inclui "border-color"), que vence na cascata: vem depois com a mesma importância, ou tem
!important quando ela não tem. É uma análise só do texto: vale em qualquer página e estado.

Fica de fora, por segurança: declaração repetida dentro da mesma regra (pode ser fallback de navegador),
e qualquer coisa que dependa de suporte do navegador para vencer (seletor com :has(, valor com dvh, clamp()...).
"""
import os
import re
import sys

import css as tema_css

TEMA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src', 'css', 'tema.css')

LADOS = ('top', 'right', 'bottom', 'left')
ATALHOS = {
    'border': [f'border-{l}-{p}' for l in LADOS for p in ('width', 'style', 'color')],
    **{f'border-{l}': [f'border-{l}-{p}' for p in ('width', 'style', 'color')] for l in LADOS},
    **{f'border-{p}': [f'border-{l}-{p}' for l in LADOS] for p in ('width', 'style', 'color')},
    'border-radius': ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
    'padding': [f'padding-{l}' for l in LADOS],
    'margin': [f'margin-{l}' for l in LADOS],
    'background': ['background-color', 'background-image', 'background-position', 'background-size', 'background-repeat',
                   'background-attachment', 'background-origin', 'background-clip'],
    'font': ['font-style', 'font-variant', 'font-weight', 'font-stretch', 'font-size', 'line-height', 'font-family'],
    'transition': ['transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay'],
    'flex': ['flex-grow', 'flex-shrink', 'flex-basis'],
    'overflow': ['overflow-x', 'overflow-y'],
    'outline': ['outline-width', 'outline-style', 'outline-color'],
    'list-style': ['list-style-type', 'list-style-position', 'list-style-image'],
    'text-decoration': ['text-decoration-line', 'text-decoration-style', 'text-decoration-color'],
}
DEPENDE_DO_NAVEGADOR = re.compile(r'dvh|svh|lvh|color-mix|clamp\(|@container')


def propriedades_reais(prop):
    prop = prop.lower()
    return set(ATALHOS.get(prop, [prop]))


def pedacos(corpo):
    """Posições (início, fim) de cada pedaço do corpo entre ';' (fora de parênteses e aspas)."""
    saida, nivel, aspas, inicio = [], 0, None, 0
    for k, ch in enumerate(corpo):
        if aspas:
            if ch == aspas and corpo[k - 1] != '\\':
                aspas = None
        elif ch in '"\'':
            aspas = ch
        elif ch == '(':
            nivel += 1
        elif ch == ')':
            nivel -= 1
        elif ch == ';' and nivel == 0:
            saida.append((inicio, k))
            inicio = k + 1
    saida.append((inicio, len(corpo)))
    return saida


def declaracoes(corpo):
    """[(propriedade, valor, importante)] na ordem."""
    saida = []
    for a, b in pedacos(corpo):
        texto = corpo[a:b]
        if ':' in texto and texto.strip():
            prop, valor = texto.split(':', 1)
            saida.append((prop.strip(), valor.strip(), bool(re.search(r'!\s*important\s*$', valor))))
    return saida


def seletores(lista):
    return [re.sub(r'\s+', ' ', s.strip()) for s in re.split(r',(?![^(]*\))', lista) if s.strip()]


def regras(css_min):
    """Regras do CSS minificado na ordem da fonte, cada uma com a posição na cascata final:
    o mm-core.css (colado no admin) vem antes do mm-extra (injetado pelo mm.js)."""
    lista = []
    imports = tema_css.IMPORTS.match(css_min)
    if imports:
        css_min = css_min[imports.end():]

    def juntar(media, seletor, corpo):
        lista.append(dict(media=media, seletor=seletor, decls=declaracoes(corpo), no_extra=tema_css.vai_para_extra(seletor)))

    for cabeca, corpo in tema_css.blocos(css_min):
        if cabeca.startswith(('@media', '@supports')):
            for seletor, regras_ in tema_css.blocos(corpo):
                juntar(cabeca, seletor, regras_)
        elif not cabeca.startswith('@'):
            juntar(None, cabeca, corpo)
    ordem = sorted(range(len(lista)), key=lambda k: (lista[k]['no_extra'], k))
    for posicao, k in enumerate(ordem):
        lista[k]['cascata'] = posicao
    return lista


def mortas(lista):
    """Conjunto de (índice da regra, índice da declaração) que nunca valem."""
    quem_define = {}   # (media, seletor, propriedade real) -> [(posição na cascata, importante, regra)]
    for k, r in enumerate(lista):
        if ':has(' in r['seletor']:
            continue
        for prop, valor, importante in r['decls']:
            if DEPENDE_DO_NAVEGADOR.search(valor):
                continue
            for s in seletores(r['seletor']):
                for p in propriedades_reais(prop):
                    quem_define.setdefault((r['media'], s, p), []).append((r['cascata'], importante, k))

    def vencida(r, k, s, p, importante):
        for media in {r['media'], None}:   # regra sem @media vale também dentro de qualquer @media
            for cascata, imp, k2 in quem_define.get((media, s, p), []):
                if k2 != k and ((imp and not importante) or (imp == importante and cascata > r['cascata'])):
                    return True
        return False

    resultado = set()
    for k, r in enumerate(lista):
        for d, (prop, valor, importante) in enumerate(r['decls']):
            if prop.startswith('--'):
                continue
            if all(vencida(r, k, s, p, importante) for s in seletores(r['seletor']) for p in propriedades_reais(prop)):
                resultado.add((k, d))
    return resultado


def analisar(texto_fonte):
    lista = regras(tema_css.encurtar(tema_css.minificar(texto_fonte)))
    return lista, mortas(lista)


# ---------- reescrever a fonte sem as mortas ----------

def _fim_do_bloco(s, j):
    nivel, k, aspas = 0, j, None
    while k < len(s):
        ch = s[k]
        if aspas:
            if ch == aspas and s[k - 1] != '\\':
                aspas = None
        elif s.startswith('/*', k):
            k = s.index('*/', k) + 2
            continue
        elif ch in '"\'':
            aspas = ch
        elif ch == '{':
            nivel += 1
        elif ch == '}':
            nivel -= 1
            if nivel == 0:
                return k + 1
        k += 1
    raise ValueError('bloco sem fechamento')


def _regras_da_fonte(s, inicio=0, fim=None):
    """Regras da fonte (com comentários e formato), na mesma ordem de regras()."""
    fim = len(s) if fim is None else fim
    saida, i = [], inicio
    while i < fim:
        if s[i].isspace():
            i += 1
        elif s.startswith('/*', i):
            i = s.index('*/', i) + 2
        elif s.startswith('@import', i):
            i = s.index(';', s.index(')', i)) + 1
        else:
            j = s.index('{', i)
            k = _fim_do_bloco(s, j)
            cabeca = re.sub(r'/\*.*?\*/', '', s[i:j], flags=re.S).strip()
            if cabeca.startswith(('@media', '@supports')):
                saida += _regras_da_fonte(s, j + 1, k - 1)
            elif not cabeca.startswith('@'):
                saida.append(dict(seletor=cabeca, inicio=i, fim=k, corpo_inicio=j + 1, corpo_fim=k - 1))
            i = k
    return saida


def limpar(texto_fonte):
    """Devolve o texto da fonte sem as declarações mortas."""
    lista, mortas_ = analisar(texto_fonte)
    fonte = _regras_da_fonte(texto_fonte)
    assert len(fonte) == len(lista), f'{len(fonte)} regras na fonte, {len(lista)} no minificado'
    trocas = []   # (início, fim, texto novo), aplicadas de trás para frente
    for k, (f, r) in enumerate(zip(fonte, lista)):
        assert tema_css.encurtar(tema_css.minificar(f['seletor'])) == r['seletor'], (f['seletor'], r['seletor'])
        morrem = {d for d in range(len(r['decls'])) if (k, d) in mortas_}
        if not morrem:
            continue
        if len(morrem) == len(r['decls']):   # regra inteira: sai com a quebra de linha
            fim = f['fim']
            while fim < len(texto_fonte) and texto_fonte[fim] in ' \t':
                fim += 1
            if fim < len(texto_fonte) and texto_fonte[fim] == '\n':
                fim += 1
            trocas.append((f['inicio'], fim, ''))
            continue
        corpo = texto_fonte[f['corpo_inicio']:f['corpo_fim']]
        ficam, n = [], -1
        for a, b in pedacos(corpo):
            texto = corpo[a:b]
            if ':' in texto and texto.strip():
                n += 1
                if n in morrem:
                    continue
            ficam.append(texto)
        novo = ';'.join(ficam).rstrip() + corpo[len(corpo.rstrip()):]
        trocas.append((f['corpo_inicio'], f['corpo_fim'], novo))
    for inicio, fim, novo in sorted(trocas, reverse=True):
        texto_fonte = texto_fonte[:inicio] + novo + texto_fonte[fim:]
    return re.sub(r'@media[^{]*\{\s*\}\n?', '', texto_fonte), len(mortas_)


def main():
    with open(TEMA, encoding='utf-8') as f:
        texto = f.read()
    if '--limpar' in sys.argv:
        novo, n = limpar(texto)
        with open(TEMA, 'w', encoding='utf-8') as f:
            f.write(novo)
        print(f'{n} declarações mortas tiradas de src/css/tema.css; rode o build.py')
        return 0
    lista, mortas_ = analisar(texto)
    for k, d in sorted(mortas_):
        r = lista[k]
        prop, valor, _ = r['decls'][d]
        print(f'  {(r["media"] or "")[:28]:28} {r["seletor"][:70]:70} {prop}:{valor[:40]}')
    print(f'{len(mortas_)} declarações mortas em {sum(len(r["decls"]) for r in lista)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
