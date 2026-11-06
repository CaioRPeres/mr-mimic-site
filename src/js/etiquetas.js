/* Etiquetas do card (06/11/2026, boas práticas da Baymard: selo demais em cima da foto perde força e polui).
   Na foto ficam só o que diz respeito ao produto (estado e FOIL, carimbados na imagem da carta) e o desconto (% OFF),
   que é a oferta. "Frete grátis" sai de cima da foto e vira uma linha discreta logo abaixo do preço.
   A etiqueta original do tema continua no HTML (escondida pelo tema.css), então nada se perde se este script falhar: só a posição muda. Estilo no fim do tema.css (.mm-tag-frete). */
(function () {
  const visivel = el => !!el && !/display:\s*none/.test(el.getAttribute("style") || "");
  function marcar() {
    document.querySelectorAll(".js-item-product:not(.mm-etq)").forEach(card => {
      card.classList.add("mm-etq");
      const frete = card.querySelector(".js-shipping-label-private");
      const preco = card.querySelector(".item-price-container");
      if (!visivel(frete) || !preco || card.querySelector(".mm-tag-frete")) return;
      const tag = document.createElement("div");
      tag.className = "mm-tag-frete";
      tag.textContent = "Frete grátis";
      preco.insertAdjacentElement("afterend", tag);
    });
  }
  marcar();
  let pendente = 0;
  new MutationObserver(() => { if (!pendente) pendente = setTimeout(() => { pendente = 0; marcar(); }, 150); })
    .observe(document.body, { childList: true, subtree: true });
})();
