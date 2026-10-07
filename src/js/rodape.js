/* Rodapé com arte: a textura de quadrinhos com o baú (a mesma do fundo dos banners), o baú feliz à esquerda
   com um balão e o baú cavaleiro à direita. No celular fica só o baú feliz, centralizado em cima.
   Imagens em assets/rodape/ (geradas por banners/faz_rodape.py); estilo em src/css/rodape.css. */
(function () {
  const rodape = document.querySelector("footer");
  if (!rodape || rodape.querySelector(".mm-rodape-arte")) return;

  rodape.classList.add("mm-rodape");
  rodape.style.setProperty("--mm-padrao", `url("${MM.asset("rodape/padrao.webp")}")`);

  const arte = document.createElement("div");
  arte.className = "mm-rodape-arte";
  arte.setAttribute("aria-hidden", "true");
  arte.innerHTML = `
    <div class="mm-rodape-esq"><span class="mm-balao">Valeu pela visita!</span><img src="${MM.asset("rodape/feliz.webp")}" alt="" loading="lazy" width="244" height="220"></div>
    <div class="mm-rodape-dir"><img src="${MM.asset("rodape/cavaleiro.webp")}" alt="" loading="lazy" width="238" height="220"></div>`;
  rodape.prepend(arte);
})();
