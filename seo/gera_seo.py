#!/usr/bin/env python3
"""Gera o texto de SEO da loja: título (≤ 70) e descrição (≤ 160) para home, páginas, categorias e produtos.

Entrada : produtos.json  (id → nome, href, cat, preco), colhido da loja no ar em 06/10/2026.
Saída   : seo.json       (o que foi aplicado no admin) e um relatório no terminal.
Os dois ficam nesta pasta. Onde cada texto entra no admin está no README.md do repositório, seção "SEO".

Regras do texto (06/10/2026):
- a palavra que a pessoa busca vem primeiro ("Carta Pokémon", "Sleeve", "Booster Box"); a marca no fim;
- só fato verificado: nada de "frete grátis", "melhor preço", estoque, filtro UV, número de páginas;
- nenhuma frase cortada no meio: cada texto tem versões em ordem de preferência e entra a primeira que cabe;
- voz da loja no plural; sem ponto de exclamação; sem telefone (decisão do Caio, 06/10/2026).
"""
import json
import os
import re
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
MAX_TITULO = 70
MAX_DESC = 160
MAX_TEXTO_CATEGORIA = 140
ENVIO = "Envio para todo o Brasil."

SERIE_DA_SIGLA = {"ME05": "Megaevolução", "ME04": "Megaevolução", "ME02": "Megaevolução", "PRE": "Escarlate e Violeta"}
RE_CARTA = re.compile(r"^(?P<nome>.+?) (?P<num>\d{3}/\d{3}) - (?P<col>[^()]+?) \((?P<sigla>[A-Z0-9]+)\) - (?P<rar>.+)$")


def tamanho(texto, limite):
    """O título da Nuvemshop é cortado em 70 BYTES (UTF-8: letra acentuada conta 2); a descrição, em caracteres."""
    return len(texto.encode("utf-8")) if limite == MAX_TITULO else len(texto)


def primeiro_que_cabe(opcoes, limite, rotulo):
    """Devolve a primeira opção que cabe no limite; se nenhuma couber, para com erro."""
    for texto in opcoes:
        if tamanho(texto, limite) <= limite:
            return texto
    raise SystemExit(f"nenhuma versão cabe em {limite} caracteres: {rotulo}\n  " + "\n  ".join(opcoes))


# ------------------------------------------------------------------ home e páginas
HOME = {
    "titulo": "Mr. Mimic | Cartas Pokémon avulsas, selados e acessórios TCG",
    "descricao": "Loja de Pokémon TCG: cartas avulsas NM em português, booster box e blisters lacrados, sleeves, toploaders e pastas BRA. Compramos sua coleção.",
}

PAGINAS = {
    "contato": ("Contato | Mr. Mimic TCG & Colecionáveis",
                "Fale com a Mr. Mimic pelo e-mail contato@mrmimic.com.br, pelo Instagram @mrmimicbr ou pelo formulário. Cartas Pokémon TCG, selados e acessórios."),
    "venda-suas-cartas": ("Venda suas Cartas Pokémon | Compramos sua Coleção | Mr. Mimic",
                          "Compramos sua coleção de cartas Pokémon: de 1 carta à coleção inteira, avaliação carta a carta e pagamento no Pix. Também compramos games, consoles e figures."),
    "envio-e-entrega": ("Envio e Entrega | Prazos e Frete | Mr. Mimic",
                        "Prazos e formas de envio da Mr. Mimic: postagem em até 1 dia útil após o pagamento, Correios e transportadoras, embalagem reforçada para cartas e lacrados."),
    "trocas-e-devolucoes": ("Trocas e Devoluções | Mr. Mimic",
                            "Política de trocas e devoluções da Mr. Mimic, conforme o Código de Defesa do Consumidor: desistência em 7 dias, produto com defeito, cartas e lacrados."),
    "politica-de-privacidade": ("Política de Privacidade | Mr. Mimic",
                                "Como a Mr. Mimic TCG & Colecionáveis trata seus dados pessoais, de acordo com a LGPD: o que coletamos, para que usamos e como pedir exclusão."),
}

# ------------------------------------------------------------------ categorias (id do admin → textos)
CATEGORIAS = {
    "41338849": dict(nome="Cartas avulsas",
                     titulo="Cartas Pokémon Avulsas em Português | Rara, Ilustração Rara e EX",
                     seo="Cartas Pokémon avulsas em português, todas NM e retiradas do booster: Rara Dupla, Ultra Rara, Ilustração Rara e EX. Enviadas em sleeve, com proteção rígida.",
                     texto="Cartas Pokémon avulsas em português, condição NM, direto do booster. Enviadas protegidas em sleeve."),
    "41338850": dict(nome="Escuridão Absoluta",
                     titulo="Cartas Escuridão Absoluta ME05 Avulsas | Megaevolução Pokémon TCG",
                     seo="Cartas avulsas de Megaevolução Escuridão Absoluta (ME05) em português: Mega Darkrai ex, Mega Zeraora ex, Ilustração Rara e Ultra Rara. NM, direto do booster.",
                     texto="Cartas avulsas da coleção Megaevolução Escuridão Absoluta (ME05), em português e NM."),
    "41338851": dict(nome="Caos Ascendente",
                     titulo="Cartas Caos Ascendente (ME04) Avulsas | Megaevolução Pokémon TCG",
                     seo="Cartas avulsas de Megaevolução Caos Ascendente (ME04) em português, em Rara Dupla, Ilustração Rara e Ultra Rara. Condição NM, direto do booster.",
                     texto="Cartas avulsas da coleção Megaevolução Caos Ascendente (ME04), em português e NM."),
    "41338852": dict(nome="Fogo Fantasmagórico",
                     titulo="Cartas Fogo Fantasmagórico ME02 Avulsas | Megaevolução Pokémon",
                     seo="Cartas avulsas de Megaevolução Fogo Fantasmagórico (ME02) em português, em Rara Dupla, Ilustração Rara e Ultra Rara. Condição NM, direto do booster.",
                     texto="Cartas avulsas da coleção Megaevolução Fogo Fantasmagórico (ME02), em português e NM."),
    "41338853": dict(nome="Evoluções Prismáticas",
                     titulo="Cartas Evoluções Prismáticas Avulsas | Pokémon TCG em Português",
                     seo="Cartas avulsas de Escarlate e Violeta Evoluções Prismáticas (PRE) em português, condição NM. Enviadas em sleeve, com proteção rígida.",
                     texto="Cartas avulsas da coleção Escarlate e Violeta Evoluções Prismáticas (PRE), em português e NM."),
    "41338854": dict(nome="Acessórios",
                     titulo="Acessórios para Cartas Pokémon | Sleeves, Toploaders, Cases e Pastas",
                     seo="Acessórios BRA para proteger e organizar a coleção: sleeves 63x88mm, double sleeves, toploaders, cases magnéticos e pastas 3x3 e 1x1. " + ENVIO,
                     texto="Sleeves, toploaders, cases magnéticos e pastas BRA para proteger e organizar suas cartas Pokémon."),
    "41338855": dict(nome="Sleeves",
                     titulo="Sleeves 63x88mm BRA para Cartas Pokémon | Básico, Double e Foil",
                     seo="Sleeves BRA no padrão 63x88mm: básico, double sleeve, premium, foil e coloridos. Proteção para cartas Pokémon e outros TCGs, em pacotes de 50 a 200 unidades.",
                     texto="Sleeves BRA 63x88mm para cartas Pokémon: básico, double, premium, foil e coloridos."),
    "41338859": dict(nome="Pastas e fichários",
                     titulo="Pastas para Cartas Pokémon 3x3 e 1x1 BRA | Fichário de Cards",
                     seo="Pastas premium BRA para cartas colecionáveis: modelo 3x3, com 9 cartas por página, e 1x1, em várias cores. Guarde a coleção Pokémon organizada e protegida.",
                     texto="Pastas premium BRA 3x3 e 1x1, em várias cores, para guardar e exibir sua coleção."),
    "41338860": dict(nome="Toploaders e cases",
                     titulo="Toploaders e Cases Magnéticos para Cartas | Proteção Rígida BRA",
                     seo="Toploader cristal com 25 unidades e cases magnéticos 4mm e 55PT da BRA: proteção rígida para cartas Pokémon raras, para guardar, transportar e expor.",
                     texto="Toploaders cristal e cases magnéticos BRA: proteção rígida para as cartas que merecem destaque."),
    "41374972": dict(nome="Kits",
                     titulo="Kits de Acessórios para Cartas Pokémon | Sleeves + Toploaders BRA",
                     seo="Kits BRA com sleeves e toploaders, double sleeves e combos duplos: o que você precisa para proteger cartas Pokémon em um só pedido. " + ENVIO,
                     texto="Combos de sleeves, toploaders e cases BRA para proteger sua coleção em um só pedido."),
    "41338856": dict(nome="Pokémon TCG",
                     titulo="Pokémon TCG Lacrado em Português | Booster Box, Blisters e Boxes",
                     seo="Selados Pokémon TCG em português, lacrados de fábrica: booster box com 36 boosters, blisters, box com pôster e lançamentos como Reinado Delta. Pix e cartão.",
                     texto="Booster box, blisters e boxes Pokémon TCG em português, lacrados de fábrica."),
    "41338857": dict(nome="Blisters e boxes",
                     titulo="Blisters e Boxes Pokémon TCG Lacrados em Português | Copag",
                     seo="Blister duplo, triplo e quádruplo e box de coleção Pokémon TCG em português, lacrados: Celebração de 30 Anos, Reinado Delta e mais. Produtos oficiais Copag.",
                     texto="Blisters e boxes de coleção Pokémon TCG em português, lacrados, oficiais da Copag."),
    "41338858": dict(nome="Booster Box",
                     titulo="Booster Box Pokémon TCG 36 Boosters Lacrado em Português | Display",
                     seo="Booster box (display) Pokémon TCG com 36 boosters, lacrado de fábrica e em português: Escuridão Absoluta (ME05) e pré-venda de Reinado Delta. Pix e cartão.",
                     texto="Displays com 36 boosters, lacrados de fábrica e em português."),
}

# ------------------------------------------------------------------ produtos: selados (texto escrito à mão)
SELADOS = {
    "Elite Trainer Box Destined Rivals (EN) - Pokémon TCG": (
        "Elite Trainer Box Destined Rivals (Inglês) Lacrada | Pokémon TCG",
        "Elite Trainer Box Pokémon TCG Destined Rivals em inglês, lacrada de fábrica, com 9 boosters e acessórios para jogar. Pix, cartão e envio para todo o Brasil."),
    "Booster Display ME05 Escuridão Absoluta (PT) - 36 boosters": (
        "Booster Box Escuridão Absoluta ME05 Lacrado 36 Boosters | Pokémon",
        "Booster box (display) Megaevolução Escuridão Absoluta (ME05) em português, lacrado de fábrica, com 36 boosters: Mega Darkrai ex e Mega Zeraora ex. Pix e cartão."),
    "Blister Duplo com Moeda - Celebração de 30 Anos (PT)": (
        "Blister Duplo com Moeda Celebração de 30 Anos Lacrado | Pokémon TCG",
        "Blister duplo Pokémon TCG Celebração de 30 Anos em português, lacrado: 2 boosters, carta promocional e moeda comemorativa. Produto oficial Copag. Pix e cartão."),
    "Box Display Reinado Delta (PT) - 36 boosters": (
        "Booster Box Reinado Delta Lacrado 36 Boosters | Pré-venda Pokémon",
        "Booster box Megaevolução Reinado Delta em português, lacrado, com 36 boosters e Mega Rayquaza ex. Lançamento em 6 de novembro de 2026. Avise-me quando chegar."),
    "Blister Quádruplo Reinado Delta (PT)": (
        "Blister Quádruplo Reinado Delta Lacrado | Pré-venda Pokémon TCG",
        "Blister quádruplo Megaevolução Reinado Delta em português, lacrado: 4 boosters e carta promocional. Lançamento em 6 de novembro de 2026. Avise-me quando chegar."),
    "Blister Triplo Reinado Delta (PT)": (
        "Blister Triplo Reinado Delta Lacrado | Pré-venda Pokémon TCG",
        "Blister triplo Megaevolução Reinado Delta em português, lacrado: 3 boosters e carta promocional. Lançamento em 6 de novembro de 2026. Avise-me quando chegar."),
    "Box Coleção com Pôster - Celebração de 30 Anos (PT)": (
        "Box Coleção com Pôster Celebração de 30 Anos Lacrada | Pokémon",
        "Box de coleção Pokémon TCG Celebração de 30 Anos em português, lacrada, com boosters, cartas promocionais e pôster comemorativo. Produto oficial Copag."),
}


# ------------------------------------------------------------------ produtos: cartas avulsas (por modelo)
def seo_carta(m):
    nome, num, col, sigla, rar = m["nome"], m["num"], m["col"].strip(), m["sigla"], m["rar"].strip()
    serie = SERIE_DA_SIGLA.get(sigla, "")
    colecao = f"{serie} {col}" if serie else col
    titulo = primeiro_que_cabe([
        f"{nome} {num} {col} ({sigla}) {rar} | Carta Pokémon",
        f"{nome} {num} {col} {rar} | Carta Pokémon",
        f"{nome} {num} {col} ({sigla}) {rar}",
        f"{nome} {num} {col} {rar}",
        f"{nome} {num} ({sigla}) {rar} | Carta Pokémon",
        f"{nome} {num} ({sigla}) {rar}",
    ], MAX_TITULO, nome)
    descricao = primeiro_que_cabe([
        f"Carta Pokémon {nome} {num} da coleção {colecao} ({sigla}), raridade {rar}, em português e NM, direto do booster. Enviada protegida em sleeve.",
        f"Carta Pokémon {nome} {num}, {colecao} ({sigla}), {rar}, em português e NM, direto do booster. Enviada protegida em sleeve.",
        f"Carta Pokémon {nome} {num}, {col} ({sigla}), {rar}. Em português, NM, direto do booster. Enviada em sleeve.",
        f"Carta Pokémon {nome} {num}, {col} ({sigla}), {rar}. Em português, NM, direto do booster.",
    ], MAX_DESC, nome)
    return titulo, descricao


# ------------------------------------------------------------------ produtos: acessórios (por família)
def seo_acessorio(nome):
    partes = nome.split(" - ")
    variante = partes[1] if len(partes) > 1 else ""
    if nome.startswith("Kit") and "Toploader" in nome and "Sleeve" in nome:
        t = [f"{nome} | Kit para Cartas Pokémon", nome]
        d = [f"Kit BRA com sleeves 63x88mm e toploader cristal: a camada macia e a proteção rígida para cartas Pokémon em um só pedido. {ENVIO}"]
    elif nome.startswith("Kit") and "Toploader" in nome:
        t = [f"{nome} | Proteção Rígida para Cartas", nome]
        d = [f"Kit com 2 pacotes de toploader cristal BRA, 25 unidades cada, 63x88mm: proteção rígida para guardar, enviar e expor cartas Pokémon. {ENVIO}"]
    elif nome.startswith("Kit") and "Sabores" in nome:
        t = [f"{nome} | Sleeves 63x88mm", nome]
        d = [f"Kit com 2 pacotes de sleeve BRA Sabores, 60 unidades cada, nas versões banana e cereja, 63x88mm, para cartas Pokémon e outros TCGs. {ENVIO}"]
    elif nome.startswith("Kit") and "Foil" in nome:
        t = [f"{nome} | Sleeves Holográficos", nome]
        d = [f"Kit com 2 pacotes de sleeve foil BRA, 50 unidades cada, 63x88mm, com acabamento holográfico, para cartas Pokémon e outros TCGs. {ENVIO}"]
    elif nome.startswith("Kit"):
        tipo = "double sleeve premium" if "Premium" in nome else "double sleeve"
        t = [f"{nome} | Sleeves BRA", nome]
        d = [f"Kit com 2 pacotes de {tipo} BRA, padrão 63x88mm: proteção reforçada para cartas Pokémon e outros TCGs, com economia no combo. {ENVIO}",
             f"Kit com 2 pacotes de {tipo} BRA, padrão 63x88mm: proteção reforçada para cartas Pokémon e outros TCGs. {ENVIO}"]
    elif nome.startswith("Pasta Premium Colors 3x3"):
        t = [f"Pasta Premium 3x3 BRA {variante} | Pasta para Cartas Pokémon", f"Pasta Premium 3x3 BRA {variante}"]
        d = [f"Pasta premium BRA 3x3 nas cores {variante.lower()}, sem caixa: 9 cartas por página para organizar e exibir a coleção Pokémon. {ENVIO}"]
    elif nome.startswith("Pasta Premium 1x1"):
        t = [f"Pasta Premium 1x1 BRA {variante} | Pasta para Cartas Pokémon"]
        d = [f"Pasta premium BRA 1x1 na cor {variante.lower()}: uma carta por página, para destacar as cartas mais valiosas da coleção Pokémon. {ENVIO}"]
    elif nome.startswith("Case Magnético"):
        esp = "55PT" if "55PT" in nome else "4mm"
        t = [f"Case Magnético {esp} BRA Unitário | Proteção para Carta Pokémon"]
        d = [f"Case magnético BRA {esp}, unitário: acrílico rígido com fecho magnético para proteger e expor uma carta Pokémon rara. {ENVIO}"]
    elif nome.startswith("Toploader"):
        t = ["Toploader Cristal BRA 25 Unidades 63x88mm | Proteção Rígida para Cartas"]
        d = [f"Toploader cristal BRA, pacote com 25 unidades, 63x88mm: proteção rígida e transparente para guardar e enviar cartas Pokémon. {ENVIO}"]
    elif nome.startswith("Sleeve Foil"):
        t = ["Sleeve Foil BRA 50 Unidades 63x88mm | Sleeve Holográfico para Cartas"]
        d = [f"Sleeve foil BRA, 50 unidades, 63x88mm, com acabamento holográfico: protege e dá brilho às cartas Pokémon no deck ou na pasta. {ENVIO}"]
    elif nome.startswith("Sleeve Colors"):
        t = [f"Sleeve Colors BRA {variante} 50 Unidades 63x88mm | Sleeve para Cartas"]
        d = [f"Sleeve BRA Colors na cor {variante.lower()}, 50 unidades, 63x88mm: proteção e identidade para o deck Pokémon e outros TCGs. {ENVIO}"]
    elif nome.startswith("Sleeve Sabores"):
        t = [f"Sleeve Sabores BRA {variante} 60 Unidades 63x88mm | Sleeve para Cartas", f"Sleeve Sabores BRA {variante} 60 Unidades 63x88mm"]
        d = [f"Sleeve BRA Sabores {variante.lower()}, 60 unidades, 63x88mm, para cartas Pokémon e outros TCGs, no deck ou na pasta. {ENVIO}"]
    elif nome.startswith("Double Sleeve Premium"):
        t = ["Double Sleeve Premium BRA 180 Unidades 63x88mm | Sleeve para Cartas"]
        d = [f"Double sleeve premium BRA, 180 unidades, padrão 63x88mm: proteção reforçada para cartas Pokémon e outros TCGs. {ENVIO}"]
    elif nome.startswith("Double Sleeve"):
        t = ["Double Sleeve BRA 200 Unidades 63x88mm | Sleeve para Cartas Pokémon"]
        d = [f"Double sleeve BRA, 200 unidades, padrão 63x88mm: proteção reforçada para cartas Pokémon e outros TCGs. {ENVIO}"]
    elif nome.startswith("Sleeve Básico"):
        t = ["Sleeve Básico BRA Transparente 200 Unidades 63x88mm | Sleeve para Cartas"]
        d = [f"Sleeve básico BRA transparente, 200 unidades, 63x88mm: proteção contra riscos e digitais para cartas Pokémon, no deck, na pasta ou no envio. {ENVIO}"]
    else:
        raise SystemExit(f"acessório sem regra de SEO: {nome}")
    t += [s.replace(" 63x88mm |", " |") for s in t] + [nome]           # versões mais curtas, na ordem
    d += [s.replace(" " + ENVIO, "") for s in d]
    return primeiro_que_cabe(t, MAX_TITULO, nome), primeiro_que_cabe(d, MAX_DESC, nome)


def seo_produto(produto):
    """Escolhe o modelo certo para o produto (carta, selado ou acessório)."""
    nome = produto["nome"]
    carta = RE_CARTA.match(nome)
    if carta:
        return seo_carta(carta)
    if nome in SELADOS:
        return SELADOS[nome]
    if produto["cat"] == "acessorios":
        return seo_acessorio(nome)
    raise SystemExit(f"produto sem regra de SEO: {nome}")


def confere_limites(saida):
    """Lista o que passar do limite (deve voltar vazia)."""
    erros = []

    def checa(rotulo, titulo, descricao):
        if tamanho(titulo, MAX_TITULO) > MAX_TITULO or len(descricao) > MAX_DESC:
            erros.append((rotulo, tamanho(titulo, MAX_TITULO), len(descricao)))

    checa("home", saida["home"]["titulo"], saida["home"]["descricao"])
    for k, (t, d) in saida["paginas"].items():
        checa(k, t, d)
    for c in saida["categorias"].values():
        checa(c["nome"], c["titulo"], c["seo"])
        if len(c["texto"]) > MAX_TEXTO_CATEGORIA:
            erros.append((c["nome"] + " (texto)", 0, len(c["texto"])))
    for p in saida["produtos"].values():
        checa(p["nome"], p["titulo"], p["descricao"])
    return erros


def main():
    produtos = json.load(open(os.path.join(AQUI, "produtos.json"), encoding="utf-8"))
    saida = {"home": HOME, "paginas": PAGINAS, "categorias": CATEGORIAS, "produtos": {}}
    for pid, p in produtos.items():
        titulo, descricao = seo_produto(p)
        saida["produtos"][pid] = {"nome": p["nome"], "titulo": titulo, "descricao": descricao, "href": p["href"]}
    erros = confere_limites(saida)
    json.dump(saida, open(os.path.join(AQUI, "seo.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    tit = [len(v["titulo"]) for v in saida["produtos"].values()]
    des = [len(v["descricao"]) for v in saida["produtos"].values()]
    print(f"produtos: {len(saida['produtos'])} | categorias: {len(CATEGORIAS)} | páginas: {len(PAGINAS)}")
    print(f"títulos de produto: {min(tit)}–{max(tit)} | descrições: {min(des)}–{max(des)} | fora do limite: {erros or 'nenhum'}")
    if "--lista" in sys.argv:
        for v in saida["produtos"].values():
            print(f"\n[{v['nome'][:64]}]\n  T({len(v['titulo'])}): {v['titulo']}\n  D({len(v['descricao'])}): {v['descricao']}")
    return 1 if erros else 0


if __name__ == "__main__":
    sys.exit(main())
