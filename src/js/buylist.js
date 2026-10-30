/* Buylist na página "Venda suas cartas": preço fixo por carta e por estado, sacola e pedido pronto para enviar.
   Os valores saem do menor entre a venda real e o menor anúncio da Liga (29/10/2026), vezes CONFIG.pct; mexer só em CONFIG e D.
   D: [nome, coleção, nº, média de venda 3m, faixa de vendas, menor anúncio na Liga, piso (mediana das vendas NM: 14 dias, senão 30, senão 12 meses; todas coletadas em 29-30/10/2026)].
   Estilo injetado aqui mesmo (.mmb-*), fora do limite do CSS do admin. */
(function () {
  const alvo = document.getElementById("mm-buylist");
  if (!alvo) return;
  const CONFIG = {
    pct: 0.55,   // régua do Caio (29/10/2026): paga 55% do MENOR entre a venda real (piso do método) e o menor anúncio da Liga
    data: "30/10/2026",
    bonusCredito: 0.10,
    prazoResposta: "2 dias úteis",
    prazoPagamento: "1 dia útil"
  };
  const EMAIL = MM.contato.email, INSTAGRAM = MM.contato.instagram;
  const ED = {
  a:'Celebração 30 Anos', b:'Celebração 30 Anos · Clássicas', c:'Celebração 30 Anos (JP)',
  d:'Caos Ascendente', e:'Escuridão Absoluta', f:'Equilíbrio Perfeito', g:'Storm Emeralda',
  h:'30 Anos Premium Deck Espeon e Umbreon (JP)', i:'Abyss Eye (JP)'
};
  const D = [
['Charizard','b','004',1113.57,5,899.9,809.95],['Mega Greninja ex','d','122',1088.29,2,710,899.9],['Lugia','b','149',894.05,3,645,644.95],
['Mega Darkrai ex','e','120',849.24,5,400,798.99],['Mega Darkrai ex','e','116',826.71,5,540.99,568.9],['Mega Greninja ex','d','116',718.04,5,596.55,649.94],
['Mega Zygarde ex','f','124',658.79,2,520,621],['Mew ex','a','152',612.62,6,477,398.99],['Mew ex','c','129',592.37,2,750,450],
['Mew ex','a','158',576.2,5,320,326.45],['Pikachu ex','a','150',529.1,5,299.9,318.9],['Gengar ex','a','154',513.3,5,384.9,384.5],
['Magikarp','b','203',507.28,5,450,462],['Pikachu ex','a','149',490.49,5,299.9,309.65],['Meowth ex','f','121',486.2,4,409,449.99],
['Mewtwo ex','a','151',438.33,5,249.99,298.99],['Mewtwo ex','a','157',416.83,6,294.99,268],['Gengar','b','094',399.01,4,289.75,289.9],
['Sylveon ex','a','153',378.79,5,239.9,245],['Gengar ex','c','131',368.01,1,369.99,359],['Mewtwo ex','c','128',339.86,1,265.9,271.9],
['Sylveon ex','c','130',307.69,1,279,279.9],['Jirachi ex','a','155',274.87,5,167.8,188.1],['Encorajamento da Rose','f','123',251.93,3,218.5,242.5],
['Pikachu e Zekrom-GX','b','033',239.19,3,157,164.99],['Morpeko ex','e','117',231.36,6,147,147],['Mega Clefable ex','f','119',225.02,4,149.9,215.5],
['Cinccino ex','d','119',207.08,5,160,174],['Mega Zeraora ex','e','114',204.22,6,151.99,162.89],['Mega Zygarde ex','f','120',202.57,5,188.89,189],
['Celebi Luminescente','b','106c',200.57,5,115,119.95],['Clarita','e','119',195.88,5,149.67,160],['Pikachu','b','058',188.03,5,124.99,149.9],
['Mega Chandelure ex','e','115',183.75,6,139,153.97],['Greninja ex','a','148',175.46,6,115,129.85],['Mega Starmie ex','f','118',168.2,5,149.8,159.9],
['Tranquilidade do AZ','d','120',159.56,5,128,137],['Rayquaza-EX','b','085',157.57,5,116.9,116.9],['Arceus-V-ASTRO','b','123',155.95,4,91.13,93.79],
['Darkrai & Cresselia LENDA','b','099',155.26,5,104.9,113.99],['Mega Dragalge ex','d','118',150.33,5,102,113.95],['Palkia LV.X','b','106',146.21,4,99.8,106.6],
['N','b','101',145.54,5,130,129.37],['Batalha Decisiva do Gladio','e','118',145.04,6,125,129.76],['Darkrai & Cresselia LENDA','b','100',141.4,5,95,96.89],
['Kyogre','g','080',141.14,3,88.9,104.45],['Show da Roxie','d','121',136.33,5,108.9,129.99],['Mew-VMAX','b','114',134.84,5,145,145.4],
['Mega Floette ex','d','117',133.81,5,108.9,115.9],['M Gardevoir-EX','b','106b',129.64,4,98.7,96.7],['Fuecoco ex','a','147',123.54,6,89,92.9],
['Jaci','f','122',119.88,5,109,118],['Vitalidade da Misty','e','111',113.43,6,66.9,89.9],['Meowth ex','f','107',112.17,6,102.6,107.91],
['Salamence ex','a','156',112.13,6,78.9,79],['Kecleon','g','088',104.1,1,67,74],['Poké Tablet','f','113',100.49,6,89.9,92],
['Tyranitar Sombrio','b','019',95.51,5,56.89,58],['Clefairy','f','094',92.43,6,60,76],['Misty','b','018',85.85,5,56,60],
['Meowth','a','144',84.73,6,56.9,58.05],['Maushold','a','146',84.57,6,44.3,45],['Scizor ex','b','108',82.91,4,63.9,66.5],
['Fuecoco ex','c','124',82.12,1,79.9,76.4],['Jigglypuff da Érica','b','069',81.65,5,70,67.8],['Zeraora','h','042',79.91,1,149,79.9],
['Slowbro','i','087',78.42,1,54.9,82.5],['Victini','h','041',78.17,1,69.9,79.9],['M Gardevoir-EX','c','156',73.27,1,100,59.9],
['Greninja TURBO','b','041',71.5,5,84,64.94],['Meowth','c','120',69.64,2,61.89,64.9],['Mega Greninja ex','d','100',66.9,6,45,55],
['Growlithe','g','078',66.57,5,48,53.16],['Zacian-V','b','138',65.84,5,42,39.99],['Meowth de Alola','a','139',64.46,6,42,44.99],
['Lapras','a','131',63.56,7,42.9,44.9],['Maushold','c','123',60.2,1,59.95,59.89],['Raikou','b','050',59.59,5,59.9,47.99],
['Meowth de Galar','c','117',59.3,2,59,64.9],['Meowth de Alola','c','115',59.04,2,58,64.9],['Genesect-EX','b','011b',58.75,5,44.67,49.99],
['Clarita','e','109',57.97,6,49,49.99],['Articuno','c','107',57.7,3,47.9,49.89],['Encorajamento da Rose','f','114',52.57,6,42.8,45],
['Ditto','c','121',47.92,4,63,44.75],['Lapras','c','106',46.68,5,56.9,59.95]
];

  // base = o menor entre a venda real (piso: mediana das vendas NM recentes na Liga) e o menor anúncio; sem piso, só o anúncio
  const JP_EDS = ["c", "h", "i"];   // japonesas ficam fora da buylist (decisão do Caio, 29/10/2026); as fotos seguem o índice de D, por isso filtra aqui
  const cards = D.map((r, i) => { const base = Math.min(r[5], r[6] || r[3]); /* sem piso ainda (null), a média de venda 3m faz as vezes */ return { id: i, name: r[0], ed: r[1], num: r[2], mkt: r[3], q: r[4], nm: Math.floor(base * CONFIG.pct * 10) / 10 }; }).filter(c => !JP_EDS.includes(c.ed));
  const BRL = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const priceOf = c => c.nm;   // só NM: a buylist compra apenas carta quase nova
  const foto = c => MM.asset("buylist/" + String(c.id).padStart(2, "0") + ".jpg");   // mesma ordem de D
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const css = `
.mmb h3{font-family:'Londrina Solid',sans-serif;font-weight:900;font-size:32px;color:#F4EDE1;text-shadow:2px 2px 0 #3A2C5E;text-align:center;margin:44px 0 8px}
.mmb-sub{text-align:center;font:500 16px/1.45 Figtree,system-ui;color:#C9BCEB;margin:0 auto 20px;max-width:640px}
.mmb-lay{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:20px;align-items:start}
.mmb-tools{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px}
.mmb input,.mmb select{font:600 15px Figtree,system-ui;color:#F4EDE1;background:#211839;border:2px solid #090612;border-radius:10px;padding:10px 12px;min-width:0}
.mmb-tools input{flex:1 1 200px}
.mmb-count{font:500 14px Figtree,system-ui;color:#B9AEDA;margin:0 0 12px}
.mmb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:12px}
.mmb-img{display:block;width:100% !important;height:auto !important;max-height:none !important;aspect-ratio:350/489;object-fit:contain;border-radius:6px;background:#211839}
.mmb-nm{align-self:flex-start;background:#9CFF3D;color:#241B38;border-radius:6px;padding:1px 8px;font:800 11px Figtree,system-ui;letter-spacing:.05em}
.mmb-card h4{font-size:15px !important;line-height:1.15 !important}
.mmb-card{padding:10px;gap:6px}
.mmb-card .mmb-ed{font-size:10px}
.mmb-card button{width:100%;padding:6px 10px;font-size:14px}
.mmb-tot b{font:800 18px Figtree,system-ui !important;color:#F4EDE1 !important;text-shadow:none !important}
.mmb-bag h4{font-size:20px !important}
.mmb-card{background:#312654;border:2px solid #090612;border-radius:16px;box-shadow:4px 4px 0 #090612;padding:14px;display:flex;flex-direction:column;gap:8px;min-width:0}
.mmb-ed{font:800 11px Figtree,system-ui;letter-spacing:.06em;text-transform:uppercase;color:#B9AEDA}
.mmb-card h4{font:900 22px/1.05 'Londrina Solid',sans-serif;color:#F4EDE1;margin:0;overflow-wrap:anywhere}
.mmb-num{align-self:flex-start;background:#211839;border:1px solid #4A3B70;border-radius:6px;padding:1px 8px;font:800 12px Figtree,system-ui;color:#E4DCF5}
.mmb-pay{display:flex;align-items:baseline;gap:8px;margin-top:auto}
.mmb-price{font:700 14px/1 Figtree,system-ui;color:#F4EDE1;font-variant-numeric:tabular-nums}
.mmb-pay small{font:600 11px Figtree,system-ui;color:#B9AEDA}
.mmb-row{display:flex;gap:8px}
.mmb-row select{flex:1 1 auto;padding:8px}
.mmb button{font:800 15px Figtree,system-ui;cursor:pointer;color:#241B38;background:#FFD12E;border:2px solid #090612;border-radius:10px;box-shadow:3px 3px 0 #090612;padding:8px 14px}
.mmb button:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #090612}
.mmb button.mmb-g{background:#211839;color:#F4EDE1}
.mmb-bag{position:sticky;top:12px;background:#312654;border:2px solid #090612;border-radius:16px;box-shadow:5px 5px 0 #090612;padding:16px;min-width:0}
.mmb-bag h4{font:900 26px 'Londrina Solid',sans-serif;color:#F4EDE1;margin:0}
.mmb-bag ul{list-style:none;margin:10px 0;padding:0;display:flex;flex-direction:column;gap:8px;max-height:42vh;overflow:auto}
.mmb-bag li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 8px;border-bottom:1px dashed #4A3B70;padding-bottom:8px;color:#F4EDE1;font:600 14px Figtree,system-ui}
.mmb-bag li small{color:#B9AEDA;grid-column:1}
.mmb-bag li .v{font-weight:800;grid-row:1;grid-column:2}
.mmb-bag li button{grid-column:2;grid-row:2;padding:2px 8px;font-size:12px;box-shadow:none}
.mmb-tot{display:flex;justify-content:space-between;align-items:baseline;border-top:2px solid #090612;padding-top:10px;color:#C9BCEB;font:600 14px Figtree,system-ui}
.mmb-tot b{font:900 32px 'Londrina Solid',sans-serif;color:#9CFF3D}
.mmb-hint{font:500 13px/1.4 Figtree,system-ui;color:#B9AEDA;margin:8px 0 0}
.mmb-err{color:#FF6B9D}
.mmb-form{display:flex;flex-direction:column;gap:8px;margin-top:12px}
.mmb-out{display:none;margin-top:12px}.mmb-out.on{display:block}
.mmb textarea{width:100%;min-height:150px;font:12px/1.4 ui-monospace,Consolas,monospace;color:#F4EDE1;background:#211839;border:2px solid #090612;border-radius:10px;padding:8px;resize:vertical}
.mmb-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.mmb-acts a{text-decoration:none}
.mmb-regras{margin-top:26px;font:500 13px/1.5 Figtree,system-ui;color:#B9AEDA}
.mmb-regras b{color:#F4EDE1}
@media(max-width:900px){.mmb-lay{grid-template-columns:minmax(0,1fr)}.mmb-bag{position:static;order:-1}.mmb-bag ul{max-height:none}.mmb h3{font-size:26px;margin-top:32px}}`;
  const estilo = document.createElement("style"); estilo.textContent = css; document.head.appendChild(estilo);

  alvo.className = "mmb";
  alvo.innerHTML = `
    <h3>Buylist: o que pagamos hoje</h3>
    <p class="mmb-sub">Veja o valor <b>antes</b> de vender e monte sua lista. Compramos <b>somente cartas NM</b> (quase novas, sem marca de uso), em português ou inglês. Preços de ${CONFIG.data}, fixos por unidade.</p>
    <div class="mmb-lay">
      <div>
        <div class="mmb-tools">
          <input id="mmb-q" type="search" placeholder="Buscar carta (ex.: Mew ex, Lapras)" aria-label="Buscar carta">
          <select id="mmb-ed" aria-label="Coleção"></select>
          <select id="mmb-sort" aria-label="Ordenar"><option value="price">Maior preço</option><option value="sales">Mais vendidas</option><option value="name">Nome (A–Z)</option></select>
        </div>
        <p class="mmb-count" id="mmb-count"></p>
        <div class="mmb-grid" id="mmb-grid"></div>
      </div>
      <aside class="mmb-bag" aria-live="polite">
        <h4>Minha lista</h4>
        <p class="mmb-hint" id="mmb-empty">Nenhuma carta ainda. Escolha uma e clique em Vender.</p>
        <ul id="mmb-items"></ul>
        <div class="mmb-tot"><span>Total no Pix</span><b id="mmb-total">R$ 0,00</b></div>
        <p class="mmb-hint" id="mmb-credit"></p>
        <div class="mmb-form">
          <input id="mmb-nome" type="text" placeholder="Seu nome" aria-label="Seu nome" autocomplete="name">
          <input id="mmb-contato" type="text" placeholder="Seu e-mail ou Instagram" aria-label="Seu e-mail ou Instagram">
          <select id="mmb-forma" aria-label="Como quer receber"><option value="pix">Receber no Pix</option><option value="credito">Crédito na loja (com bônus)</option></select>
        </div>
        <p class="mmb-hint mmb-err" id="mmb-err"></p>
        <div class="mmb-acts"><button id="mmb-send" style="flex:1">Gerar minha lista</button><button id="mmb-clear" class="mmb-g" title="Esvaziar a lista">Limpar</button></div>
        <div class="mmb-out" id="mmb-out">
          <textarea id="mmb-msg" readonly aria-label="Lista pronta para enviar"></textarea>
          <div class="mmb-acts">
            <button id="mmb-copy" style="flex:1">Copiar lista</button>
            <a id="mmb-mail" href="#"><button class="mmb-g" type="button">E-mail</button></a>
            <a href="${INSTAGRAM}" target="_blank" rel="noopener"><button class="mmb-g" type="button">Instagram</button></a>
          </div>
          <p class="mmb-hint">Copie e envie para ${esc(EMAIL)} ou por mensagem no Instagram.</p>
        </div>
      </aside>
    </div>
    <p class="mmb-regras"><b>Regras.</b> Só compramos carta em estado NM; o valor é a nossa expectativa de compra por unidade, e a aprovação final considera estoque e procura e pode haver contraproposta. Respondemos em até ${CONFIG.prazoResposta}; só depois de aprovado você recebe o endereço para postar nos Correios e informa o rastreio. Chegou como informado, o Pix sai em até ${CONFIG.prazoPagamento} depois da conferência. Se vier pior, avisamos antes de pagar e fazemos uma contraproposta; se você não aceitar, as cartas voltam e o frete de volta é por conta de quem vende. Preços atualizados periodicamente.</p>`;

  const $ = id => document.getElementById(id);
  const state = { bag: {} };
  try { const s = JSON.parse(localStorage.getItem("mm-bag-nm") || "{}"); if (s && typeof s === "object") state.bag = s; } catch (e) {}
  const save = () => { try { localStorage.setItem("mm-bag-nm", JSON.stringify(state.bag)); } catch (e) {} };
  $("mmb-ed").innerHTML = '<option value="">Todas as coleções</option>' + Object.entries(ED).filter(([k]) => !JP_EDS.includes(k)).map(([k, v]) => `<option value="${k}">${v}</option>`).join("");

  function render() {
    const q = $("mmb-q").value.trim().toLowerCase(), ed = $("mmb-ed").value, sort = $("mmb-sort").value;
    const list = cards.filter(c => (!ed || c.ed === ed) && (!q || (c.name + " " + ED[c.ed] + " " + c.num).toLowerCase().includes(q)));
    list.sort((a, b) => sort === "name" ? a.name.localeCompare(b.name, "pt-BR") : sort === "sales" ? (b.q - a.q) || (b.mkt - a.mkt) : b.nm - a.nm);
    $("mmb-count").textContent = list.length + (list.length === 1 ? " carta" : " cartas") + " na lista";
    $("mmb-grid").innerHTML = list.map(c => `
      <article class="mmb-card" data-id="${c.id}">
        <img class="mmb-img" src="${foto(c)}" alt="${esc(c.name)} nº ${esc(c.num)}" loading="lazy" width="350" height="489">
        <div class="mmb-ed">${esc(ED[c.ed])}</div>
        <h4>${esc(c.name)}</h4>
        <div class="mmb-row"><span class="mmb-num">Nº ${esc(c.num)}</span><span class="mmb-nm">NM</span></div>
        <div class="mmb-pay"><span class="mmb-price">${BRL(c.nm)}</span></div>
        <button data-sell>Vender</button>
      </article>`).join("") || '<p class="mmb-hint">Nenhuma carta encontrada. Tente outro nome.</p>';
  }
  function renderBag() {
    const rows = Object.entries(state.bag).filter(([k, v]) => cards[v.id]).map(([k, v]) => ({ key: k, ...v, c: cards[v.id] }));
    $("mmb-empty").hidden = rows.length > 0;
    $("mmb-items").innerHTML = rows.map(r => `<li><b>${r.qty}× ${esc(r.c.name)} <small>Nº ${esc(r.c.num)}</small></b><span class="v">${BRL(priceOf(r.c) * r.qty)}</span><small>${esc(ED[r.c.ed])} · NM</small><button class="mmb-g" data-del="${r.key}">remover</button></li>`).join("");
    const total = rows.reduce((s, r) => s + priceOf(r.c) * r.qty, 0);
    $("mmb-total").textContent = BRL(total);
    const b = Math.round(CONFIG.bonusCredito * 100);
    $("mmb-credit").textContent = total > 0 ? "Em crédito na loja: " + BRL(total * (1 + CONFIG.bonusCredito)) + " (+" + b + "% de bônus)" : "Em crédito na loja você recebe " + b + "% a mais.";
    $("mmb-out").classList.remove("on");
  }
  $("mmb-grid").addEventListener("click", e => {
    if (!e.target.matches("[data-sell]")) return;
    const id = +e.target.closest(".mmb-card").dataset.id, key = "nm" + id;
    state.bag[key] = { id, qty: (state.bag[key] ? state.bag[key].qty : 0) + 1 };
    save(); renderBag();
  });
  $("mmb-items").addEventListener("click", e => {
    const k = e.target.dataset && e.target.dataset.del; if (!k || !state.bag[k]) return;
    if (state.bag[k].qty > 1) state.bag[k].qty--; else delete state.bag[k];
    save(); renderBag();
  });
  $("mmb-clear").addEventListener("click", () => { state.bag = {}; save(); renderBag(); });
  $("mmb-send").addEventListener("click", () => {
    const rows = Object.values(state.bag).filter(v => cards[v.id]);
    if (!rows.length) { $("mmb-err").textContent = "Adicione pelo menos uma carta antes de gerar a lista."; return; }
    const nome = $("mmb-nome").value.trim(), contato = $("mmb-contato").value.trim();
    if (!nome || !contato) { $("mmb-err").textContent = "Preencha seu nome e um e-mail ou Instagram para gerar a lista."; return; }
    $("mmb-err").textContent = "";
    let total = 0;
    const lines = rows.map(v => { const c = cards[v.id], p = priceOf(c); total += p * v.qty; return `${v.qty}x ${c.name} (${ED[c.ed]}, nº ${c.num}) - NM - ${BRL(p)} cada = ${BRL(p * v.qty)}`; });
    const credito = $("mmb-forma").value === "credito";
    const receber = credito ? "Crédito na loja: " + BRL(total * (1 + CONFIG.bonusCredito)) + " (com " + Math.round(CONFIG.bonusCredito * 100) + "% de bônus)" : "Pix: " + BRL(total);
    const msg = `PEDIDO DE VENDA - Buylist Mr. Mimic (${CONFIG.data})\nNome: ${nome}\nContato: ${contato}\n\n${lines.join("\n")}\n\nTotal: ${BRL(total)}\nQuero receber em: ${receber}\n\nEntendo que o valor final é confirmado na conferência das cartas.`;
    $("mmb-msg").value = msg; $("mmb-out").classList.add("on");
    $("mmb-mail").href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Pedido de venda - Buylist Mr. Mimic") + "&body=" + encodeURIComponent(msg);
  });
  $("mmb-copy").addEventListener("click", async () => {
    const t = $("mmb-msg"), b = $("mmb-copy");
    try { await navigator.clipboard.writeText(t.value); b.textContent = "Copiada!"; setTimeout(() => b.textContent = "Copiar lista", 1800); }
    catch (e) { t.focus(); t.select(); }
  });
  ["input", "change"].forEach(ev => { $("mmb-q").addEventListener(ev, render); $("mmb-ed").addEventListener(ev, render); $("mmb-sort").addEventListener(ev, render); });
  render(); renderBag();
})();
