/* Busca pelo número da carta (07/11/2026, pedido do Caio: "falta ter opção de procurar a carta pelo número").
   A busca da Nuvemshop compara palavra por palavra e pelo começo: "92" não acha "(092/128)", "16" traz 169 e 167,
   e "134/128" traz todas as /128. Quando a busca termina num número ("92", "092", "92/128", "umbreon 92", "tg05"),
   este módulo busca o número com e sem zero, fica só com as cartas desse número exato (e desse total, se digitado)
   e troca a grade da página de resultados. Produto que tem o número como palavra fora do parêntese ("Box 151")
   continua. "Ver a busca completa" leva à busca normal (parâmetro todos=1). Estilo em src/css/tema.css (.mm-busca-*). */
(function () {
  document.querySelectorAll(".js-search-input").forEach(i => { i.placeholder = "Nome ou número (ex.: 234/193)"; });

  if (!/^\/search\/?/.test(location.pathname)) return;
  const params = new URLSearchParams(location.search);
  const q = (params.get("q") || "").trim();
  if (!q || params.get("todos")) return;

  const m = q.match(/^(?:(.*\S)\s+)?#?(?:n[ºo°.]?\s*)?([a-z]{0,4})(\d{1,4})[a-z]{0,3}(?:\s*\/\s*([a-z]{0,4})(\d{1,4})[a-z]*)?$/i);
  // número colado em letras ("me05", "sv49", "tg05") é sigla de coleção na maioria das buscas: fica com a busca normal
  if (!m || m[2]) return;
  const MAX_PAGINAS = 20, POR_VEZ = 4;
  const limpa = t => (t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const palavras = limpa(m[1]).split(/\s+/).filter(Boolean);
  const pre = limpa(m[2]), num = parseInt(m[3], 10);
  const totPre = limpa(m[4]), tot = m[5] ? parseInt(m[5], 10) : null;

  // "(092/128)", "(16/17)", "(183JP/165)", "(012)", "(TG05/TG30)": prefixo, número e total de cada parêntese do nome
  function numeroBate(nome) {
    for (const p of nome.matchAll(/\(([^)]*)\)/g)) {
      const c = p[1].trim().match(/^([a-z]{0,4})(\d{1,4})[a-z]{0,3}\s*(?:\/\s*([a-z]{0,4})(\d{1,4})[a-z]*)?$/i);
      if (!c || limpa(c[1]) !== pre || parseInt(c[2], 10) !== num) continue;
      if (tot === null || (c[4] && parseInt(c[4], 10) === tot && (!totPre || limpa(c[3]) === totPre))) return true;
    }
    return false;
  }
  // o número como palavra solta no nome, fora dos parênteses ("Coleção Especial 151")
  const palavraSolta = nome => tot === null && !pre &&
    new RegExp("(^|[^\\w/])0*" + num + "(?![\\w/])").test(limpa(nome).replace(/\([^)]*\)/g, " "));
  const serve = nome => { const n = limpa(nome); return palavras.every(w => n.includes(w)) && (numeroBate(nome) || palavraSolta(nome)); };

  const grade = document.querySelector(".js-product-table");
  if (!grade) return;
  grade.classList.add("mm-busca-carregando");

  // o número sozinho, com e sem zeros, traz todas as cartas dele (a Nuvemshop junta as palavras com "ou" e compara
  // pelo começo); as palavras do nome são conferidas aqui, porque "ex" ou "pikachu" na consulta trariam a loja inteira
  const variantes = [...new Set([String(num), String(num).padStart(2, "0"), String(num).padStart(3, "0")].map(v => pre + v))];
  const consulta = variantes.join(" ");
  const pagina = n => fetch("/search/page/" + n + "/?q=" + encodeURIComponent(consulta) + "&results_only=true", { cache: "no-cache" })
    .then(r => r.ok ? r.text() : "").then(h => [...new DOMParser().parseFromString(h, "text/html").querySelectorAll(".js-item-product")])
    .catch(() => []);

  async function buscar() {
    const achados = [], vistos = new Set();
    for (let ini = 1; ini <= MAX_PAGINAS; ini += POR_VEZ) {
      const lotes = await Promise.all(Array.from({ length: POR_VEZ }, (_, k) => pagina(ini + k)));
      let fim = false;
      for (const itens of lotes) {
        if (!itens.length) { fim = true; break; }
        for (const it of itens) {
          const id = it.getAttribute("data-product-id"), nome = (it.querySelector(".js-item-name") || {}).textContent || "";
          if (!id || vistos.has(id)) continue;
          vistos.add(id);
          if (serve(nome)) achados.push(it);
        }
      }
      if (fim) break;
    }
    return achados;
  }

  const esc = t => t.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const rotulo = (pre + String(num).padStart(3, "0")).toUpperCase() + (tot !== null ? "/" + (totPre + String(tot).padStart(3, "0")).toUpperCase() : "");

  buscar().then(achados => {
    const disp = achados.filter(c => !(MM.esgotado && MM.esgotado(c))), esg = achados.filter(c => MM.esgotado && MM.esgotado(c));
    const todos = location.pathname + "?q=" + encodeURIComponent(q) + "&todos=1";
    const aviso = document.createElement("div");
    aviso.className = "mm-busca-num col-12";
    const doNome = palavras.length ? " e “" + esc(m[1]) + "”" : "";
    // sem carta com esse número a grade da Nuvemshop fica como veio, com o aviso em cima
    if (!achados.length) {
      aviso.innerHTML = "<strong>Nenhuma carta com o número " + esc(rotulo) + "</strong>" + doNome + ". Abaixo, a busca completa.";
      grade.prepend(aviso); grade.classList.remove("mm-busca-carregando");
      return;
    }
    aviso.innerHTML = "<strong>" + achados.length + (achados.length === 1 ? " resultado" : " resultados") + " com o número " + esc(rotulo) + "</strong>" +
      doNome + ' · <a href="' + esc(todos) + '">ver a busca completa</a>';
    grade.querySelectorAll(".js-item-product").forEach(c => c.remove());
    grade.prepend(aviso);
    disp.concat(esg).forEach(it => {
      const card = document.importNode(it, true);
      card.querySelectorAll("img").forEach(im => {
        const ds = im.dataset.srcset, d = im.dataset.src;
        if (ds) im.srcset = ds;
        if (d) im.src = d; else if (ds) im.src = ds.split(",").pop().trim().split(" ")[0];
        im.classList.remove("lazyload"); im.classList.add("lazyloaded");
      });
      grade.appendChild(card);
    });
    // a paginação do tema conta a busca original
    const pag = grade.parentElement && grade.parentElement.querySelector(".row.justify-content-center.align-items-center");
    if (pag) pag.style.display = "none";
    grade.classList.remove("mm-busca-carregando");
    window.mmCorCards && window.mmCorCards();
  }, () => grade.classList.remove("mm-busca-carregando"));
})();
