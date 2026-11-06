"""Conta os produtos COM ESTOQUE de cada categoria e subcategoria do menu, direto da loja, e grava
src/dados/menu-contagem.json, que o nav.js usa para ordenar o menu (06/11/2026, pedido do Caio: "as coleções que têm
mais cartas têm que estar no topo do menu... a segunda é fogo fantasmagórico, que não tem nenhuma carta").

    python3 menu_contagem.py        # depois: python3 build.py e publicar

Rodar de novo sempre que entrar ou sair muita carta (lote novo, coleção que esgotou). Subcategoria com 0 em estoque
some do menu; com estoque, volta sozinha na próxima contagem.
"""
import json
import os
import re
import time
import urllib.request

LOJA = 'https://www.mrmimic.com.br'
AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, 'src', 'dados', 'menu-contagem.json')


def pegar(url):
    for tentativa in range(6):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (mr-mimic menu_contagem)'})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode('utf-8', 'replace')
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return ''
            time.sleep(5 * (tentativa + 1))
        except Exception:
            time.sleep(5 * (tentativa + 1))
    raise RuntimeError('não abriu ' + url)


def caminhos_do_menu():
    html = pegar(LOJA + '/')
    ini = re.search(r'<ul[^>]*desktop-list-subitems', html).start()
    trecho = html[ini:ini + 15000]
    vistos = []
    for href, nome in re.findall(r'<a[^>]*href="([^"]+)"[^>]*>\s*([^<]{2,60}?)\s*</a>', trecho):
        caminho = re.sub(r'^https?://(www\.)?mrmimic\.com\.br', '', href)
        if caminho.startswith('/') and caminho not in ('/', '/contato/', '/venda-suas-cartas/', '/produtos/') and caminho not in vistos:
            vistos.append(caminho)
        if 'Venda suas cartas' in nome:
            break
    return vistos


def contar(caminho):
    total = estoque = 0
    pagina = 1
    while pagina < 40:
        url = LOJA + caminho + ('' if pagina == 1 else 'page/%d/' % pagina)
        html = pegar(url)
        rotulos = re.findall(r'data-store="product-item-label-stock"([^>]*)>', html)
        if not rotulos:
            break
        total += len(rotulos)
        estoque += sum(1 for r in rotulos if re.search(r'style="display:\s*none', r))
        if ('href="%spage/%d/"' % (caminho, pagina + 1)) not in html:
            break
        pagina += 1
        time.sleep(1)
    return total, estoque


def main():
    contagem = {}
    for caminho in caminhos_do_menu():
        total, estoque = contar(caminho)
        contagem[caminho] = {'total': total, 'estoque': estoque}
        print('%-55s %4d produtos, %4d com estoque' % (caminho, total, estoque))
        time.sleep(1)
    dados = {'lido_em': time.strftime('%Y-%m-%d %H:%M'), 'categorias': contagem}
    with open(SAIDA, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=1)
    print('gravado', SAIDA)


if __name__ == '__main__':
    main()
