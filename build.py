"""Monta o tema da Mr. Mimic para a loja real (mrmimic.com.br, Nuvemshop, tema Morelia).

    python3 build.py

Lê src/ e grava:
  dist/mm-core.css   colar no admin: Loja online > Layout > Editar layout atual > "Edição de css avançada"
  dist/mm-extra.css  só para conferência; o conteúdo vai embutido no mm.js
  dist/mm.js         carregado por uma linha no rodapé do tema (ver README.md, "Publicar")

As imagens que os scripts usam ficam em assets/ e são servidas pelo jsDelivr junto com o mm.js.
"""
import json
import os
import re
import sys

import css as tema_css

AQUI = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(AQUI, 'src')
DIST = os.path.join(AQUI, 'dist')

# O logo do cabeçalho é uma imagem de fundo no CSS colado no admin, com endereço preso a este commit.
# Mantendo o mesmo endereço, o mm-core.css não muda a cada build e não precisa ser colado de novo.
BASE_DO_CSS = 'https://cdn.jsdelivr.net/gh/CaioRPeres/mr-mimic-site@92d2d55ea43998895f79bae92ea2abd1a182408a/'

# Ordem importa: o slider entra antes da grade de categorias, que se posiciona logo depois dele;
# a cor dos cards vem antes do produto.js, que usa a tabela de cores.
MODULOS_JS = ['hero', 'home-categorias', 'cor-card', 'produto', 'redes', 'venda', 'seo']
# CSS dos módulos acima, depois do tema. Tudo dele vai para o extra (só existe quando o script roda).
CSS_DOS_MODULOS = ['hero', 'home-categorias']


def ler(*caminho):
    with open(os.path.join(SRC, *caminho), encoding='utf-8') as f:
        return f.read()


def gravar(nome, texto):
    with open(os.path.join(DIST, nome), 'w', encoding='utf-8') as f:
        f.write(texto)


def montar_css():
    css = tema_css.encurtar(tema_css.minificar(ler('css', 'tema.css')))
    css = css.replace("url('logo-oficial.png')", f"url('{BASE_DO_CSS}assets/logo-oficial.png')")
    core, extra = tema_css.dividir(css)
    assert len(core) <= tema_css.LIMITE_CORE, f'mm-core.css com {len(core)} caracteres passa do limite do campo do admin'

    for nome in CSS_DOS_MODULOS:
        modulo = tema_css.encurtar(tema_css.minificar(ler('css', nome + '.css')))
        sobra_no_core, _ = tema_css.dividir(modulo)
        assert not sobra_no_core, f'{nome}.css tem regra que não é de elemento do script: {sobra_no_core[:120]}'
        extra += modulo
    return core, extra


def montar_js(extra):
    cores = json.loads(ler('dados', 'cores-produtos.json'))
    preludio = (
        '/* Mr. Mimic: scripts do tema na loja real. GERADO por build.py a partir de src/; não editar aqui. */\n'
        '(function () {\n'
        '  var eu = (document.currentScript && document.currentScript.src) || "";\n'
        '  var base = eu ? eu.replace(/dist\\/[^\\/]*$/, "") : ' + json.dumps(BASE_DO_CSS) + ';\n'
        '  window.MM = {\n'
        '    asset: function (caminho) { return base + "assets/" + caminho; },\n'
        '    naHome: function () { return !!document.querySelector(\'[data-store^="home-"]\'); },\n'
        '    cores: ' + json.dumps(cores, ensure_ascii=False) + '\n'
        '  };\n'
        '  if (!document.getElementById("mm-extra")) {\n'
        '    var estilo = document.createElement("style"); estilo.id = "mm-extra";\n'
        '    estilo.textContent = ' + json.dumps(extra, ensure_ascii=False) + ';\n'
        '    document.head.appendChild(estilo);\n'
        '  }\n'
        '})();\n')
    # cada módulo isolado: um erro num não derruba os outros
    modulos = [f'/* ===== {nome}.js ===== */\ntry {{\n{ler("js", nome + ".js")}\n}} catch (e) {{ console.warn("mm {nome}.js", e); }}\n'
               for nome in MODULOS_JS]
    return preludio + '\n'.join(modulos)


def conferir(js):
    paginas_da_previa = re.findall(r'["\'][\w-]+\.html["\']', js)
    assert not paginas_da_previa, f'link para página da prévia no mm.js: {paginas_da_previa[:3]}'
    telefone = re.search(r'wa\.me/|api\.whatsapp|\(\d\d\)\s?9\d{4}-?\d{4}', js)
    assert not telefone, f'telefone no mm.js: {telefone.group(0)} (decisão do Caio: nada de telefone no site)'


def main():
    os.makedirs(DIST, exist_ok=True)
    core, extra = montar_css()
    js = montar_js(extra)
    conferir(js)
    gravar('mm-core.css', core)
    gravar('mm-extra.css', extra)
    gravar('mm.js', js)
    print(f'mm-core.css {len(core)} caracteres (limite {tema_css.LIMITE_CORE}) | mm-extra.css {len(extra)} | mm.js {len(js)}')


if __name__ == '__main__':
    sys.exit(main())
