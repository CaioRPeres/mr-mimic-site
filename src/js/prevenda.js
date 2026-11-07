/* Pré-venda (05/11/2026, pedido do Caio): o primeiro lote do Reinado Delta é exclusivo do site, no preço sugerido,
   e só é enviado a partir de 08/11/2026. No card, faixa amarela "PRÉ-VENDA" no pé da foto; na página do produto,
   aviso amarelo no topo do formulário de compra. Estilo no fim do tema.css (.mm-selo-prevenda, .mm-prevenda-aviso).
   Para encerrar a pré-venda de um produto antes da data: apagar o id da lista e publicar. Chave = id do produto na
   Nuvemshop. No dia do envio ela some sozinha. */
(function () {
  const PRE_VENDA = {
    "371968038": "08/11/2026",  // Box Display Reinado Delta (36 boosters)
    "371967559": "08/11/2026",  // Blister Triplo Reinado Delta
    "371967940": "08/11/2026",  // Blister Quádruplo Reinado Delta
    "379345349": "08/11/2026",  // Coleção Treinador Avançado (ETB) Reinado Delta
    "379345353": "08/11/2026"   // Combo de Booster (mini booster box) Reinado Delta
  };
  // 07/11/2026: a pré-venda acaba sozinha no dia do envio (a etiqueta e o aviso param de aparecer a partir dele,
  // pelo horário de Brasília), para o site não ficar dizendo "pré-venda" depois que o produto já está sendo enviado.
  const hojeBR = new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);   // AAAA-MM-DD em UTC-3
  const ativa = data => data.split("/").reverse().join("-") > hojeBR;
  const envio = id => Object.prototype.hasOwnProperty.call(PRE_VENDA, id || "") && ativa(PRE_VENDA[id]) ? PRE_VENDA[id] : null;
  MM.preVenda = envio;

  // 06/11/2026: a faixa saiu de cima da foto (Baymard: selo demais na foto vira poluição) e foi para a linha do
  // preço, com a data de envio: "Pré-venda · envio 08/11".
  function marcarCards() {
    document.querySelectorAll(".js-item-product:not(.mm-prevenda)").forEach(card => {
      const data = envio(card.getAttribute("data-product-id"));
      if (!data) return;
      card.classList.add("mm-prevenda");
      const preco = card.querySelector(".item-price-container");
      if (preco && !card.querySelector(".mm-tag-prevenda")) {
        const tag = document.createElement("div");
        tag.className = "mm-tag-prevenda";
        // no celular o card tem ~165 px: "envio" sai e fica "Pré-venda · 08/11" (o texto inteiro estourava o card)
        tag.innerHTML = "Pré-venda · <span class=\"mm-pv-envio\">envio </span>" + data.slice(0, 5);
        preco.insertAdjacentElement("afterend", tag);
      }
    });
  }

  function marcarPagina() {
    const form = document.querySelector('form.js-product-form[data-store^="product-form-"]');
    if (!form || form.querySelector(".mm-prevenda-aviso")) return;
    const data = envio((form.getAttribute("data-store") || "").replace("product-form-", ""));
    if (!data) return;
    const aviso = document.createElement("div");
    aviso.className = "mm-prevenda-aviso";
    const titulo = document.createElement("strong");
    titulo.textContent = "PRÉ-VENDA";
    const texto = document.createElement("span");
    texto.textContent = "Envio a partir de " + data;
    aviso.appendChild(titulo);
    aviso.appendChild(texto);
    form.insertBefore(aviso, form.firstChild);
  }

  marcarCards();
  marcarPagina();
  // cards que entram depois: fileiras da home, filtros, "você também pode gostar"
  let pendente = 0;
  new MutationObserver(() => { if (!pendente) pendente = setTimeout(() => { pendente = 0; marcarCards(); }, 150); })
    .observe(document.body, { childList: true, subtree: true });
})();
