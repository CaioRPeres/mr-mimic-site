/* Cor de destaque por produto: põe em --cor a cor dominante da foto do card; o CSS usa var(--cor)
   no hover (borda e sombra dura). Produto sem cor forte fica com o amarelo estrela do CSS.
   Alguns produtos têm a cor fixa em src/dados/cores-produtos.json (MM.cores); os demais são
   calculados na hora, lendo a foto num canvas (o CDN da Nuvemshop libera CORS). */
(function () {
  const AMOSTRA_PX = 48;
  const ALFA_MINIMO = 170;
  const BRILHO_MINIMO = 90, SATURACAO_MINIMA = 0.30;   // abaixo disso é branco, cinza ou preto
  const FRACAO_MINIMA = 0.015, PIXELS_MINIMOS = 6;     // a cor precisa cobrir uma parte da foto
  const REALCE = 1.5;

  const normaliza = t => (t || "").replace(/\s+/g, " ").trim().toLowerCase();

  // Agrupa os pixels coloridos em 64 faixas (4 níveis por canal) e devolve a média da faixa mais cheia,
  // saturada um pouco e levada ao brilho máximo (como o amarelo estrela).
  function corDominante(img) {
    const c = document.createElement("canvas"); c.width = AMOSTRA_PX; c.height = AMOSTRA_PX;
    const g = c.getContext("2d", { willReadFrequently: true });
    let px;
    try { g.drawImage(img, 0, 0, AMOSTRA_PX, AMOSTRA_PX); px = g.getImageData(0, 0, AMOSTRA_PX, AMOSTRA_PX).data; }
    catch (e) { return null; }   // canvas "sujo" (foto sem CORS)

    const faixas = new Map(); let opacos = 0;
    for (let i = 0; i < px.length; i += 4) {
      const r = px[i], gr = px[i + 1], b = px[i + 2], a = px[i + 3];
      if (a < ALFA_MINIMO) continue;
      opacos++;
      const mx = Math.max(r, gr, b), mn = Math.min(r, gr, b);
      if (mx < BRILHO_MINIMO || (mx - mn) / Math.max(mx, 1) < SATURACAO_MINIMA) continue;
      const k = ((r >> 6) << 4) | ((gr >> 6) << 2) | (b >> 6);
      const f = faixas.get(k) || [0, 0, 0, 0]; f[0]++; f[1] += r; f[2] += gr; f[3] += b; faixas.set(k, f);
    }
    let melhor = null, n = 0;
    for (const f of faixas.values()) if (f[0] > n) { n = f[0]; melhor = f; }
    if (melhor === null || n < Math.max(PIXELS_MINIMOS, opacos * FRACAO_MINIMA)) return null;

    let rgb = [melhor[1] / n, melhor[2] / n, melhor[3] / n];
    const media = (rgb[0] + rgb[1] + rgb[2]) / 3;
    rgb = rgb.map(v => Math.min(255, Math.max(0, media + (v - media) * REALCE)));
    const mx = Math.max(...rgb);
    rgb = rgb.map(v => v / mx * 255);
    return "rgb(" + rgb.map(v => v | 0).join(",") + ")";
  }

  function aplicar(card, item, cor) {
    card.dataset.mmCor = cor || "-";   // "-" = já tentou, sem cor
    if (cor) item.style.setProperty("--cor", cor);
  }

  function pintar(card) {
    if (card.dataset.mmCor) return;
    const item = card.querySelector(".item") || card;
    const fixa = MM.cores[normaliza((card.querySelector(".js-item-name") || {}).textContent)];
    if (fixa) { aplicar(card, item, fixa); return; }

    const img = card.querySelector("img");
    if (!img) return;
    const src = img.currentSrc || img.src;
    const pronta = img.complete && img.naturalWidth && !/^data:/.test(src);
    const deOutroSite = /^https?:/.test(src) && !src.startsWith(location.origin);

    if (deOutroSite) {
      // foto no CDN: abre de novo com CORS para o canvas poder ler; se o CDN negar, fica o amarelo
      const copia = new Image(); copia.crossOrigin = "anonymous";
      copia.onload = () => aplicar(card, item, corDominante(copia));
      copia.onerror = () => { card.dataset.mmCor = "-"; };
      if (pronta) copia.src = src;
      else img.addEventListener("load", () => { copia.src = img.currentSrc || img.src; }, { once: true });
      return;
    }
    const lerDaFoto = () => { if (img.naturalWidth) aplicar(card, item, corDominante(img)); };
    if (pronta) lerDaFoto();
    else img.addEventListener("load", lerDaFoto, { once: false });
  }

  function pintarTodos() { document.querySelectorAll(".js-item-product").forEach(pintar); }

  window.mmCorCards = pintarTodos;                               // a home chama de novo depois de montar as fileiras
  window.mmCorDe = nome => MM.cores[normaliza(nome)] || null;    // cor fixa de um produto pelo nome (produto.js)
  pintarTodos(); setTimeout(pintarTodos, 1500); setTimeout(pintarTodos, 4000);
  window.addEventListener("load", pintarTodos);
})();
