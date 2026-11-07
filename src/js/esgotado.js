/* Produto esgotado (26/10/2026, pedido do Caio): além da tarja "Esgotado" do tema, o card ganha a classe
   mm-esgotado (foto apagada e em cinza, nome e preço mais fracos; estilo no fim do tema.css) e, nas fileiras
   da home, vai para o fim (home-categorias.js usa MM.esgotado). Nas páginas de categoria e na busca quem põe
   o esgotado no fim é a própria Nuvemshop: Produtos › Organizar › Configurar › "Mostrar no final da lista". */
(function () {
  // todo card tem a tarja de estoque; o tema a esconde com display:none quando há estoque
  MM.esgotado = card => {
    const tarja = card.querySelector(".js-stock-label");
    return !!tarja && !/display:\s*none/.test(tarja.getAttribute("style") || "");
  };

  // Cartas vendidas que ficam na vitrine com a faixa VENDIDO, em vez do cinza de esgotado (pedido do Caio, 02/11/2026:
  // "pra mostrar que vendemos as cartas caras, que pode se confiar"). Id do produto na Nuvemshop.
  // 07/11/2026: o pedido #101 era golpe; as duas cartas voltaram para a loja e saíram da lista (estão em Promoções).
  const VENDIDOS = {
  };
  MM.vendido = card => Object.prototype.hasOwnProperty.call(VENDIDOS, card.getAttribute("data-product-id") || "");

  function marcar() {
    document.querySelectorAll(".js-item-product:not(.mm-esgotado):not(.mm-vendido)").forEach(card => {
      if (MM.vendido(card)) {
        card.classList.add("mm-vendido");
        const foto = card.querySelector(".js-item-image-padding") || card.querySelector(".item-image");
        if (foto && !foto.querySelector(".mm-faixa-vendido")) {
          const faixa = document.createElement("span");
          faixa.className = "mm-faixa-vendido";
          faixa.textContent = "VENDIDO";
          foto.appendChild(faixa);
        }
      } else if (MM.esgotado(card)) {
        card.classList.add("mm-esgotado");
      }
    });
  }

  marcar();
  // cards que entram depois: fileiras da home, filtros, "você também pode gostar"
  let pendente = 0;
  new MutationObserver(() => { if (!pendente) pendente = setTimeout(() => { pendente = 0; marcar(); }, 150); })
    .observe(document.body, { childList: true, subtree: true });
})();
