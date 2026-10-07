/* Home: grade "O que você procura?" logo abaixo do slider e três fileiras de produtos por categoria
   (cartas avulsas, selados, acessórios). O tema entrega só duas fileiras quase iguais ("Destaques",
   em grade, e "Lançamentos", em carrossel); aqui elas viram carrosséis de uma categoria cada, completados
   com produtos buscados na página da categoria. Estilo em src/css/home-categorias.css. */
(function () {
  if (!MM.naHome()) return;

  const CATEGORIAS = [
    { nome: "Cartas avulsas", sub: "nacionais e japonesas · NM", href: "/cartas-avulsas/", cor: "#FFD12E",
      foto: MM.asset("img-jp/pikachu-ex-234-193-mega-dream-ex-jp-ilustracao-secreta.jpg") },
    { nome: "Selados", sub: "displays, blisters e boxes", href: "/pokemon-tcg/", cor: "#E0479B",
      foto: MM.asset("img-prod/booster-display-me05-escuridao-absoluta-pt-36-boosters-1.webp") },
    { nome: "Acessórios", sub: "sleeves, pastas, toploaders", href: "/acessorios/", cor: "#7B5CFF",
      foto: MM.asset("img-prod/pasta-premium-colors-3x3-bra-roxa-azul-s-caixa-1.webp") },
    { nome: "Colecionáveis", sub: "em breve", href: "#", breve: true, cor: "#9CFF3D" },
    { nome: "Games", sub: "em breve", href: "#", breve: true, cor: "#35D6FF" },
    { nome: "Figures", sub: "em breve", href: "#", breve: true, cor: "#FF9F1C" },
  ];
  const PRODUTOS_POR_FILEIRA = 8;   // 2 páginas de 4
  const ESPERA_SWIPER_MS = 100, ESPERA_SWIPER_TENTATIVAS = 80;   // até 8 s

  const nomeDe = el => ((el.querySelector(".js-item-name") || {}).textContent || "").trim();
  const ehCarta = el => /\b\d{3}\/\d{3}\b/.test(nomeDe(el));   // carta tem número de coleção, ex. 108/084

  // [título, link "ver tudo", quais produtos do tema ficam, de onde buscar mais]
  const FILEIRAS = [
    { titulo: "Cartas avulsas", href: "/cartas-avulsas/", mantem: ehCarta },
    { titulo: "Selados", href: "/pokemon-tcg/", mantem: el => !ehCarta(el) },
    { titulo: "Acessórios", href: "/acessorios/", mantem: () => false },
  ];

  function montarGrade() {
    const sec = document.createElement("section");
    sec.className = "mm-cats";
    sec.innerHTML = `<h2>O que você procura?</h2><div class="grade">` + CATEGORIAS.map(c => `
    <a class="tile${c.breve ? ' breve' : ''}" href="${c.href}" style="--cor:${c.cor}">
      ${c.foto ? `<div class="foto" style="background-image:url('${c.foto}')"></div><div class="veu"></div>` : ``}
      ${c.breve ? `<span class="selo">EM BREVE</span>` : `<span class="mais">VER</span>`}
      <div class="txt"><div class="nome">${c.nome}</div><div class="sub">${c.sub}</div></div>
    </a>`).join("") + `</div>`;
    const hero = document.querySelector(".mm-hero");
    (hero ? hero.parentElement : document.body).insertBefore(sec, hero ? hero.nextSibling : null);
  }

  // Cópia vazia de uma fileira em carrossel, com classes próprias para o tema não tentar iniciá-la
  // (quem inicia o Swiper dela é o montarFileira).
  function clonarFileiraVazia(modelo, sufixo) {
    const copia = modelo.cloneNode(true);
    copia.querySelectorAll("*").forEach(el => {
      if (typeof el.className === "string" && /js-swiper-new|js-products-new/.test(el.className))
        el.className = el.className.replace(/js-swiper-new/g, "js-swiper-" + sufixo).replace(/js-products-new/g, "js-products-" + sufixo);
    });
    const cont = copia.querySelector(".swiper-container");
    cont.className = "js-swiper-" + sufixo + " swiper-container"; cont.removeAttribute("style");
    const trilho = cont.querySelector(".swiper-wrapper"); trilho.innerHTML = ""; trilho.removeAttribute("style");
    return copia;
  }

  // Produtos da página da categoria viram slides com a mesma marcação dos da home.
  async function buscarProdutos(url, quantos, vistos) {
    const html = await (await fetch(url, { cache: "no-cache" })).text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const slides = [];
    for (const item of doc.querySelectorAll(".js-item-product")) {
      const chave = nomeDe(item).toLowerCase();
      if (!chave || vistos.has(chave)) continue;
      vistos.add(chave);
      const card = document.importNode(item, true);
      card.className = "js-item-product js-item-slide p-0 item-product col-grid" + (card.classList.contains("mm-breve") ? " mm-breve" : "");
      card.removeAttribute("style");
      card.querySelectorAll("img").forEach(im => {
        const ds = im.dataset.srcset, d = im.dataset.src;
        if (ds) im.srcset = ds;
        if (d) im.src = d; else if (ds) im.src = ds.split(",").pop().trim().split(" ")[0];
        im.classList.remove("lazyload"); im.classList.add("lazyloaded");   // o tema só mostra a foto (fade-in) com esta classe
      });
      const slide = document.createElement("div"); slide.className = "swiper-slide"; slide.appendChild(card);
      slides.push(slide);
      if (slides.length >= quantos) break;
    }
    return slides;
  }

  async function montarFileira(sec, cfg, swiperModelo) {
    const h = sec.querySelector("h2,.section-title"); if (h) h.textContent = cfg.titulo;
    const cont = sec.querySelector(".swiper-container, .swiper");
    let sw = cont && cont.swiper;
    // o loop do Swiper clonava os slides (e clonava de novo a cada update): desliga
    try { if (sw && sw.params.loop) { sw.loopDestroy(); sw.params.loop = false; } } catch (e) {}

    const vistos = new Set();
    sec.querySelectorAll(".swiper-slide").forEach(sl => {
      const chave = nomeDe(sl).toLowerCase();
      if (sl.classList.contains("swiper-slide-duplicate") || !cfg.mantem(sl) || vistos.has(chave)) sl.remove(); else vistos.add(chave);
    });
    const trilho = sec.querySelector(".swiper-wrapper");
    if (trilho.children.length < PRODUTOS_POR_FILEIRA) {
      try { (await buscarProdutos(cfg.href, PRODUTOS_POR_FILEIRA - trilho.children.length, vistos)).forEach(sl => trilho.appendChild(sl)); } catch (e) {}
    }
    const verTudo = document.createElement("a"); verTudo.className = "mm-verttudo"; verTudo.href = cfg.href; verTudo.textContent = "Ver tudo em " + cfg.titulo + " →";
    sec.appendChild(verTudo);

    try {
      if (!sw && window.Swiper && swiperModelo) {
        const p = Object.assign({}, swiperModelo.params, { loop: false,
          navigation: Object.assign({}, swiperModelo.params.navigation, { nextEl: sec.querySelector(".swiper-button-next"), prevEl: sec.querySelector(".swiper-button-prev") }),
          pagination: Object.assign({}, swiperModelo.params.pagination, { el: sec.querySelector(".swiper-pagination-fraction") }) });
        delete p.el;
        sw = new Swiper(cont, p);
      }
      if (sw) { trilho.style.transform = ""; sw.update(); sw.slideTo(0, 0); sw.update(); }
      // fileira que cabe inteira na tela: sem setas e centralizada
      const cabeInteira = !!(sw && sw.isLocked);
      sec.querySelectorAll('[class*="controls"]').forEach(c => c.style.display = cabeInteira ? "none" : "");
      trilho.style.justifyContent = cabeInteira ? "center" : "";
    } catch (e) { console.warn("mm fileira", cfg.titulo, e); }
  }

  montarGrade();

  // as duas fileiras do tema: só as seções mais internas (uma de fora envolve as duas)
  const secs = [...document.querySelectorAll("section")].filter(s => s.querySelector(".js-item-product") && !s.querySelector("section")).slice(0, 2);
  if (secs.length < 2) return;

  // "Destaques" vem em grade: troca por uma cópia vazia de "Lançamentos", que é carrossel
  if (!secs[0].querySelector(".swiper-container") && secs[1].querySelector(".swiper-container")) {
    const grade = secs[0], copia = clonarFileiraVazia(secs[1], "feat");
    copia.dataset.mmClone = "1"; copia.style.order = getComputedStyle(grade).order;
    grade.parentElement.insertBefore(copia, grade); grade.style.display = "none"; secs[0] = copia;
  }

  // o tema só inicia os Swipers depois deste script: espera os dele existirem
  let tentativas = 0;
  const espera = setInterval(() => {
    const prontos = secs.filter(s => !s.dataset.mmClone).every(s => (s.querySelector(".swiper-container") || {}).swiper);
    if (!prontos && ++tentativas < ESPERA_SWIPER_TENTATIVAS) return;
    clearInterval(espera);
    const modelo = secs[1], swiperModelo = (modelo.querySelector(".swiper-container") || {}).swiper;
    const terceira = clonarFileiraVazia(modelo, "acc");
    terceira.style.order = String((parseInt(getComputedStyle(modelo).order) || 3) + 1);
    modelo.parentElement.insertBefore(terceira, modelo.nextSibling);
    Promise.all([...secs, terceira].map((s, i) => montarFileira(s, FILEIRAS[i], swiperModelo)))
      .then(() => { window.mmCorCards && window.mmCorCards(); });
  }, ESPERA_SWIPER_MS);
})();
