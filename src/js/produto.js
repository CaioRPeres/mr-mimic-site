/* Página de produto: três ajustes independentes. Estilo em src/css/tema.css (.mm-titulo, .mm-toploader, .mm-proteja*). */

/* 1. Nome em duas linhas: "Batalha Decisiva do Gladio 108/084 - Escuridão Absoluta (ME05) - Ultra Rara"
      vira título "Batalha Decisiva do Gladio 108/084" + subtítulo "Escuridão Absoluta (ME05) · Ultra Rara". */
(function () {
  const h = document.querySelector("h1.js-product-name");
  if (!h || h.querySelector(".mm-sub")) return;
  const partes = h.textContent.trim().split(/\s+[-–]\s+/);
  if (partes.length < 2) return;
  const esc = t => t.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  h.innerHTML = '<span class="mm-titulo">' + esc(partes[0]) + '</span><span class="mm-sub">' + esc(partes.slice(1).join(" · ")) + '</span>';
})();

/* 2. Embalagem: toploader só quando o preço comporta o custo dele; abaixo do corte a promessa é sleeve.
      O CSS mostra o texto certo conforme a classe .mm-toploader no formulário de compra. */
(function () {
  const CORTE_TOPLOADER = 30;   // R$, provisório
  const form = document.querySelector(".js-product-form");
  const preco = document.querySelector(".js-price-container .js-price-display, .js-price-display");
  if (!form || !preco) return;
  const valor = parseFloat((preco.textContent || "").replace(/[^\d,]/g, "").replace(",", "."));
  if (!isNaN(valor) && valor >= CORTE_TOPLOADER) form.classList.add("mm-toploader");
})();

/* 3. "Proteja sua carta" (texto da descrição das cartas): a lista de links vira uma vitrine com três
      acessórios, com foto, preço e botão. Quem compra a carta de desejo quer protegê-la.
      O preço vem da página de cada produto, para nunca ficar diferente do da loja. */
(function () {
  const titulo = [...document.querySelectorAll(".user-content h3")].find(h => /Proteja sua carta/i.test(h.textContent));
  if (!titulo) return;
  const ITENS = [
    { nome: "Sleeve Básico Duplo Cards BRA - Transparente - 200 Unidades", curto: "Sleeve Básico Duplo BRA",
      detalhe: "200 un · primeira camada, contra riscos e digitais",
      foto: "img-prod/sleeve-basico-duplo-cards-bra-transparente-200-unidades-1.webp",
      href: "/produtos/sleeve-basico-duplo-cards-bra-transparente-200-unidades/" },
    { nome: "Toploader Cristal BRA - 25 Unidades", curto: "Toploader Cristal BRA",
      detalhe: "25 un · rígido, pra transportar e expor sem amassar",
      foto: "img-prod/toploader-cristal-bra-25-unidades-1.webp",
      href: "/produtos/toploader-cristal-bra-25-unidades/" },
    { nome: "Case Magnético 4mm Cards BRA - Unitário", curto: "Case Magnético 4mm BRA",
      detalhe: "unitário · pra carta especial ficar em destaque",
      foto: "img-prod/case-magnetico-4mm-cards-bra-unitario-1.webp",
      href: "/produtos/case-magnetico-4mm-cards-bra-unitario/" },
  ];

  // O preço está numa meta tag no começo do <head>: lê só até ela e interrompe o download.
  async function precoDaPagina(url) {
    const resposta = await fetch(url);
    const leitor = resposta.body.getReader(), decodificador = new TextDecoder();
    let html = "";
    try {
      while (html.length < 100000) {
        const { value, done } = await leitor.read();
        if (done) break;
        html += decodificador.decode(value, { stream: true });
        const m = html.match(/nuvemshop:price"\s+content="([\d.]+)"/);
        if (m) return parseFloat(m[1]);
      }
      return null;
    } finally { leitor.cancel().catch(() => {}); }
  }
  const emReais = v => "R$" + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const grade = document.createElement("div");
  grade.className = "mm-proteja";
  grade.innerHTML = ITENS.map(i => `
    <a class="mm-prot" data-nome="${i.nome}" href="${i.href}">
      <span class="mm-prot-img"><img src="${MM.asset(i.foto)}" alt="${i.curto}" loading="lazy"></span>
      <span class="mm-prot-txt"><b>${i.curto}</b><small>${i.detalhe}</small><span class="mm-prot-preco">&nbsp;</span></span>
      <span class="mm-prot-btn">Ver</span>
    </a>`).join("");
  grade.querySelectorAll(".mm-prot").forEach((card, k) => {
    const campo = card.querySelector(".mm-prot-preco");
    precoDaPagina(ITENS[k].href)
      .then(v => { if (v) campo.textContent = emReais(v); else campo.style.display = "none"; })
      .catch(() => { campo.style.display = "none"; });
  });

  // a vitrine entra no lugar da lista de links; fica o parágrafo de abertura e um link para todos os acessórios
  let el = titulo.nextElementSibling, lista = null;
  while (el && el.tagName !== "H3") { if (el.tagName === "UL") { lista = el; break; } el = el.nextElementSibling; }
  if (lista) lista.replaceWith(grade); else titulo.insertAdjacentElement("afterend", grade);
  const verTodos = document.createElement("p"); verTodos.className = "mm-proteja-mais";
  verTodos.innerHTML = `<a href="/acessorios/">Ver todos os acessórios →</a>`;
  grade.insertAdjacentElement("afterend", verTodos);

  // hover na cor do produto (mesma tabela do cor-card.js)
  grade.querySelectorAll(".mm-prot").forEach(a => { const c = window.mmCorDe && window.mmCorDe(a.dataset.nome); if (c) a.style.setProperty("--cor", c); });

  // painel em volta de título + parágrafo de abertura + vitrine + link
  titulo.classList.add("mm-proteja-titulo");
  const painel = document.createElement("div"); painel.className = "mm-proteja-box";
  titulo.insertAdjacentElement("beforebegin", painel);
  const abertura = titulo.nextElementSibling && titulo.nextElementSibling.tagName === "P" && titulo.nextElementSibling !== verTodos ? titulo.nextElementSibling : null;
  [titulo, abertura, grade, verTodos].filter(Boolean).forEach(e => painel.appendChild(e));
})();
