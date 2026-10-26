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

  function marcar() {
    document.querySelectorAll(".js-item-product:not(.mm-esgotado)").forEach(card => {
      if (MM.esgotado(card)) card.classList.add("mm-esgotado");
    });
  }

  marcar();
  // cards que entram depois: fileiras da home, filtros, "você também pode gostar"
  let pendente = 0;
  new MutationObserver(() => { if (!pendente) pendente = setTimeout(() => { pendente = 0; marcar(); }, 150); })
    .observe(document.body, { childList: true, subtree: true });
})();
