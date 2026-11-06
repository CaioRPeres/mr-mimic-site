/* Pré-venda (05/11/2026, pedido do Caio): o primeiro lote do Reinado Delta é exclusivo do site, no preço sugerido,
   e só é enviado a partir de 08/11/2026. No card, faixa amarela "PRÉ-VENDA" no pé da foto; na página do produto,
   aviso amarelo no topo do formulário de compra. Estilo no fim do tema.css (.mm-selo-prevenda, .mm-prevenda-aviso).
   Para encerrar a pré-venda de um produto: apagar o id da lista e publicar. Chave = id do produto na Nuvemshop. */
(function () {
  const PRE_VENDA = {
    "371968038": "08/11/2026",  // Box Display Reinado Delta (36 boosters)
    "371967559": "08/11/2026",  // Blister Triplo Reinado Delta
    "371967940": "08/11/2026",  // Blister Quádruplo Reinado Delta
    "379345349": "08/11/2026",  // Coleção Treinador Avançado (ETB) Reinado Delta
    "379345353": "08/11/2026"   // Combo de Booster (mini booster box) Reinado Delta
  };
  const envio = id => Object.prototype.hasOwnProperty.call(PRE_VENDA, id || "") ? PRE_VENDA[id] : null;
  MM.preVenda = envio;

  function marcarCards() {
    document.querySelectorAll(".js-item-product:not(.mm-prevenda)").forEach(card => {
      if (!envio(card.getAttribute("data-product-id"))) return;
      card.classList.add("mm-prevenda");
      const foto = card.querySelector(".js-item-image-padding") || card.querySelector(".item-image");
      if (foto && !foto.querySelector(".mm-selo-prevenda")) {
        const selo = document.createElement("span");
        selo.className = "mm-selo-prevenda";
        selo.textContent = "PRÉ-VENDA";
        foto.appendChild(selo);
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
