/* Slider da home: seis banners prontos (gerados por banners/faz_banner.py), um por slide,
   com a versão larga (1920x549) e a de celular (1080x1080). Estilo em src/css/hero.css.
   Sem a luz em raios que vazava atrás do quadro (o Caio pediu para tirar, 07/10/2026). */
(function () {
  if (!MM.naHome()) return;

  const SLIDES = [
    { banner: "banner-30-anos", href: "/pokemon-tcg/",
      texto: "Celebração de 30 Anos: Box com Pôster e Blister Duplo, estoque novo" },
    { banner: "banner-escuridao-absoluta", href: "/pokemon-tcg/",
      texto: "Escuridão Absoluta: Booster Display lacrado em português" },
    { banner: "banner-cartas-avulsas", href: "/cartas-avulsas/",
      texto: "Cartas avulsas: Ilustração Rara, Ultra Rara e EX" },
    { banner: "banner-acessorios", href: "/acessorios/",
      texto: "Acessórios: sleeves, toploaders, cases e pastas" },
    { banner: "banner-compramos", href: "/venda-suas-cartas/",
      texto: "Compramos suas cartas, de 1 carta à coleção inteira" },
    { banner: "banner-reinado-delta", href: "/pokemon-tcg/",
      texto: "Reinado Delta chega na loja em 6 de novembro" },
  ];
  const TROCA_A_CADA_MS = 6500;
  const PRE_CARREGA_SEGUNDO_MS = 1500;

  const imagem = nome => MM.asset("hero/" + nome + ".webp");

  // Só o primeiro slide carrega de cara; os outros guardam o endereço em data-* até chegar a vez.
  function montarSecao() {
    const sec = document.createElement("section");
    sec.className = "mm-hero";
    const adiado = i => i ? "data-" : "";
    sec.innerHTML = `<div class="mmh-quadro">
    ${SLIDES.map((s, i) => `<div class="mmh-slide full banner${i ? '' : ' on'}">
      <a class="mmh-blink" href="${s.href}" aria-label="${s.texto}"><picture><source media="(max-width:820px)" ${adiado(i)}srcset="${imagem(s.banner + "-cel")}"><img class="mmh-full" ${adiado(i)}src="${imagem(s.banner)}" alt="${s.texto}"></picture></a></div>`).join("")}
    <button class="mmh-seta esq" aria-label="Anterior">‹</button><button class="mmh-seta dir" aria-label="Próximo">›</button>
    <div class="mmh-pontos">${SLIDES.map((_, i) => `<button class="mmh-pt${i ? '' : ' on'}" data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join("")}</div>
  </div>`;
    return sec;
  }

  // Se o tema tiver carrossel na home, o slider entra no lugar dele. O tema guarda duas cópias
  // (uma com d-none), então sai a seção inteira que envolve as duas.
  // Sem carrossel (o caso da loja hoje), entra no lugar da mensagem de boas-vindas, que repetia o slider.
  function posicionar(sec) {
    const fotos = [...document.querySelectorAll('img[alt*="Carrossel"]')];
    const carrossel = document.querySelector(".js-home-slider-section") ||
      fotos.map(f => f.closest(".js-home-main-slider-container") || f.closest(".section-slider")).find(Boolean);
    if (carrossel) {
      carrossel.parentElement.insertBefore(sec, carrossel);
      carrossel.remove();
      return;
    }
    const boasVindas = document.querySelector('[data-store="home-welcome-message"]') || document.querySelector('[data-store^="home-"]');
    const bloco = boasVindas.closest("section") || boasVindas;
    bloco.parentElement.insertBefore(sec, bloco);
    if (boasVindas.matches('[data-store="home-welcome-message"]')) bloco.style.display = "none";
  }

  function iniciarCarrossel(sec) {
    const slides = [...sec.querySelectorAll(".mmh-slide")];
    const pontos = [...sec.querySelectorAll(".mmh-pt")];
    let atual = 0, timer;

    const carregar = k => {
      k = (k + slides.length) % slides.length;
      slides[k].querySelectorAll("[data-src],[data-srcset]").forEach(el => {
        if (el.dataset.srcset) { el.srcset = el.dataset.srcset; delete el.dataset.srcset; }
        if (el.dataset.src) { el.src = el.dataset.src; delete el.dataset.src; }
      });
    };
    const mostrar = n => {
      atual = (n + slides.length) % slides.length;
      carregar(atual);
      carregar(atual + 1);   // o próximo já fica pronto antes de aparecer
      [slides, pontos].forEach(lista => lista.forEach((el, k) => el.classList.toggle("on", k === atual)));
    };
    const reiniciarTimer = () => { clearInterval(timer); timer = setInterval(() => mostrar(atual + 1), TROCA_A_CADA_MS); };
    const irPara = n => { mostrar(n); reiniciarTimer(); };

    setTimeout(() => carregar(1), PRE_CARREGA_SEGUNDO_MS);
    sec.querySelector(".mmh-seta.esq").onclick = () => irPara(atual - 1);
    sec.querySelector(".mmh-seta.dir").onclick = () => irPara(atual + 1);
    pontos.forEach(p => p.onclick = () => irPara(+p.dataset.i));
    reiniciarTimer();
  }

  const sec = montarSecao();
  posicionar(sec);
  iniciarCarrossel(sec);
})();
