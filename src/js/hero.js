/* Slider da home: seis banners prontos (gerados por banners/faz_banner.py), um por slide,
   com a versão larga (1920x549) e a de celular (1080x1080). Estilo em src/css/hero.css.
   Sem a luz em raios que vazava atrás do quadro (o Caio pediu para tirar, 07/10/2026).
   Escuridão Absoluta saiu em 08/10/2026: vendeu tudo e não vai repor. No lugar entrou a ETB de
   Destined Rivals, em primeiro, que é a peça cara com uma unidade só.
   Cartas avulsas refeito em 09/10/2026 e de novo em 11/10/2026 (banners/faz_banner_novo.py, cartas-avulsas): o
   Charizard 4/102 saiu na permuta das caixas do pôster; agora o herói é a Dialga V-ASTRO (JP) a R$ 849,90, com as
   outras cartas mais raras em estoque no leque. A faixa começa em R$ 4,90 e a peça não cita número de cartas.
   27/10/2026, pedido do Caio: o Pikachu ex 234/193 (JP) entra na frente, no lugar da Dialga, e o Mega Dragonite ex
   246/193 (JP) e o Mew ex 152/128 (30 Anos) vão para o leque. A peça ficou sem preço (o da Dialga tinha envelhecido).
   ETB Destined Rivals refeita em 11/10/2026 no padrão novo (etb-destined-rivals): preço fora da arte, caixa inteira,
   chamada também no celular. Todos os 7 banners ganharam a chamada (botão) na versão de celular em 11/10/2026.
   ETB Ascended Heroes entrou em 2º em 11/10/2026 (produto novo da aba selados): fundo = arte oficial do cabeçalho da
   coleção, logo EN, caixa real; 8 slides.
   30 Anos refeito em 10/10/2026 no mesmo padrão (banners/faz_banner_novo.py): só o Box com Pôster, a
   R$ 189,90, com a arte entrando no roxo em meio-tom; o slide leva direto ao produto.
   Acessórios refeito em 11/10/2026 no mesmo padrão: fundo azul com malha de hexágonos (escudo), os acessórios
   BRA reais em grupo compacto e o baú cavaleiro, arranjo "Fila B" escolhido pelo Caio entre composições do
   Ideogram e refeito com as fotos reais.
   Pelúcias e brinquedos (Sunny) entrou em 5º em 11/10/2026, fundo ciano, arranjo "Grupo B" escolhido pelo Caio;
   aponta para a categoria nova /pelucias-e-brinquedos/.
   Compramos suas cartas refeito em 11/10/2026 no mesmo padrão: só o baú comendo cartas (língua refeita), sem
   leque; o Caio achou cartas + baú poluído.
   Reinado Delta refeito em 11/10/2026: fundo verde da coleção com o Rayquaza (Ideogram sobre a arte oficial),
   produtos reais com a ETB em destaque, logo PT; sem preço, "em breve" com Avise-me. Fecha o padrão novo nos 7.
   30/10/2026: saíram os 3 slides de produto esgotado (ETB Destined Rivals, ETB Ascended Heroes, Box com Pôster 30 Anos);
   Reinado Delta passou para o primeiro lugar (lançamento 6/11) e Cartas avulsas para o segundo (555 cartas novas). 5 slides. */
(function () {
  if (!MM.naHome()) return;

  const SLIDES = [
    { banner: "banner-reinado-delta", href: "/pokemon-tcg/",
      texto: "Reinado Delta chega na loja em 6 de novembro: display, blisters e Treinador Avançado, cadastre o avise-me" },
    { banner: "banner-cartas-avulsas", href: "/cartas-avulsas/",
      texto: "Cartas avulsas BR, EN e JP: Pikachu ex, Mega Dragonite ex e Mew ex, todas Near Mint" },
    { banner: "banner-acessorios", href: "/acessorios/",
      texto: "Proteja sua coleção: acessórios BRA avulsos e em kits, a partir de R$ 20,90" },
    { banner: "banner-sunny", href: "/pelucias-e-brinquedos/",
      texto: "Brinquedos e pelúcias licenciados de Pokémon e Super Mario, a partir de R$ 301,90" },
    { banner: "banner-compramos", href: "/venda-suas-cartas/",
      texto: "Compramos suas cartas, de 1 carta à coleção inteira, e pagamos no Pix" },
  ];
  // Fora desde 30/10/2026: ETB Destined Rivals, ETB Ascended Heroes e Box com Pôster 30 Anos — os três
  // produtos estão sem estoque; o slide voltava a um "Avise-me". Voltam quando repor (banners continuam em assets/hero/).
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
