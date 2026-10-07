# Tema da Mr. Mimic na Nuvemshop

Código do tema da loja [mrmimic.com.br](https://mrmimic.com.br) (Nuvemshop, tema Morelia): o CSS colado no admin e o script `mm.js`, que o tema carrega do jsDelivr a partir deste repositório.

## Estrutura

```
src/
  css/tema.css            regras do tema (cores, cabeçalho, cards, página de produto, rodapé...)
  css/hero.css            estilo do slider da home
  css/home-categorias.css estilo da grade de categorias e das fileiras da home
  js/hero.js              slider da home (seis banners)
  js/home-categorias.js   grade "O que você procura?" e três fileiras por categoria
  js/cor-card.js          cor de destaque de cada card, tirada da foto
  js/produto.js           nome em duas linhas, regra do toploader, vitrine "Proteja sua carta"
  js/redes.js             ícones de contato no rodapé
  js/venda.js             página "Venda suas cartas"
  js/seo.js               título e descrição de reserva, WebSite na home
  dados/cores-produtos.json  cor fixa de alguns produtos (os demais são calculados pela foto)
assets/                   imagens que o tema usa (banners, luzes do slider, fotos da grade de categorias)
dist/                     GERADO pelo build; é o que a loja carrega
fotos-produtos/           fotos tratadas que subimos para os produtos no admin (o tema não usa)
seo/                      gerador dos títulos e descrições de SEO e o resultado aplicado
build.py                  src/ -> dist/
css.py                    minifica o CSS e separa o que vai no admin do que vai no mm.js
css_mortas.py             acha e tira declarações do tema.css que nunca valem (sobrescritas pelo mesmo seletor)
checar.py                 confere o build (e, com --loja, a loja com o build local)
proxy_local.py            prévia: a loja real com o build local
```

## Mudar alguma coisa

1. Editar em `src/`.
2. `python3 build.py`
3. `python3 checar.py --loja` (precisa do Google Chrome instalado; abre a loja sem janela e confere cada página).
4. Olhar a prévia: `python3 proxy_local.py` e abrir `http://127.0.0.1:8742/`. Celular: `http://127.0.0.1:8742/__cel?p=/`.
5. Publicar (abaixo).

### Como o CSS se divide

O `build.py` minifica `tema.css` e o divide (`css.py`):

- **`dist/mm-core.css`** vai colado no admin. Limite do campo: 50 mil caracteres (o build para em 48 mil).
- **o resto vai embutido no `mm.js`**, que o injeta num `<style id="mm-extra">`: regras de elementos criados pelos scripts (`.mm-*`, `.mmh-*`), de `:hover`/`:focus`, e as que a Nuvemshop **apaga** ao salvar o campo (seletor com `:has(`, `~` ou `::-webkit-`).

O CSS dos módulos (`hero.css`, `home-categorias.css`) vai inteiro para o `mm.js`, depois do tema.

O `tema.css` está na ordem histórica das decisões: a regra de baixo vence a de cima. Para não voltar a acumular camadas mortas, o `checar.py` falha se alguma declaração for sobrescrita pelo mesmo seletor mais abaixo; `python3 css_mortas.py --limpar` tira essas declarações sem mudar o resultado. Em 06/10/2026 saíram 330 de 1.606, conferido pelo estilo computado de todos os elementos em 17 páginas e 5 larguras.

O campo de CSS do admin também apaga algumas propriedades ao salvar: qualquer `-webkit-*`, `aspect-ratio`, `text-underline-offset`, `scrollbar-width` e `display:-webkit-box`. Numa regra que vai para o `mm-core.css` elas nunca valem; o `css_mortas.py` as trata como mortas. Para usar uma delas, a regra precisa ir para o `mm.js` (seletor de elemento `.mm-*`, por exemplo).

O logo do cabeçalho aponta para um commit fixo (`BASE_DO_CSS` no `build.py`). Assim o `mm-core.css` só muda quando o `tema.css` muda.

## Publicar

1. `git add -A && git commit && git push`. O `mm.js` passa a existir em `https://cdn.jsdelivr.net/gh/CaioRPeres/mr-mimic-site@<commit>/dist/mm.js`. O endereço preso ao commit é imutável: nenhum cliente fica com versão velha em cache.
2. Admin da Nuvemshop › Loja online › Layout › Editar layout atual (`/admin/themes/settings/active/`):
   - **Rodapé da página › Selos personalizados › "Código HTML ou Javascript do selo"**: trocar o commit da linha
     `<script src="https://cdn.jsdelivr.net/gh/CaioRPeres/mr-mimic-site@<commit>/dist/mm.js"></script>`
   - **Só se o `mm-core.css` mudou:** "Edição de css avançada". Antes de colar, recarregar o editor e comparar com o que está lá: o CSS pode ter sido ajustado direto no admin. Se aparecer "a versão que você está tentando alterar já sofreu outras modificações", cancelar e recarregar; nunca "Salvar esta versão".
   - **Publicar alterações.**
3. Conferir: `python3 checar.py` mostra o commit no ar e o último commit.

## Banners do slider

Gerados fora deste repositório, em `../banners/faz_banner.py` (configuração de cada banner em `../banners/config_banners.py`). `python3 faz_banner.py <nome> --site` grava `assets/hero/banner-<nome>.webp` e `-cel.webp`. Banner novo também entra na lista `SLIDES` de `src/js/hero.js`.

## SEO

`seo/gera_seo.py` gera `seo/seo.json` a partir de `seo/produtos.json` (produtos colhidos da loja). Regras: título até **70 bytes** (a Nuvemshop corta em bytes; letra acentuada conta 2), descrição até 160 caracteres, a palavra buscada primeiro e a marca no fim, só fato verificado.

Onde cada texto entra no admin:

| O quê | Onde |
|---|---|
| produto | página do produto › SEO |
| categoria | página da categoria › SEO |
| página (envio, trocas...) | página › "Opções avançadas" (abre clicando na seta) |
| home | Configurações › Dados do negócio › "Breve descrição", com "Utilizar o nome e a descrição do negócio para o SEO" marcado. O servidor manda só o nome da loja como título; o título completo entra pelo `seo.js`. |
| produto apagado ou com endereço trocado | Configurações › Redirecionamentos 301 |

## Decisões que o código segue

- **Nada de telefone ou WhatsApp no site** (decisão do Caio, 06/10/2026). O build para se encontrar um.
- **Preço nunca fica escrito no código.** A vitrine "Proteja sua carta" lê o preço da página de cada acessório.
- O texto do site fala no plural, como empresa ("compramos", "a gente").
