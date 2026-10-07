/* Página "Venda suas cartas": o texto do admin dá lugar a uma página montada aqui, com o mascote
   devolvendo moedas, como funciona em passos, os dois jeitos de fechar, quanto pagamos e o que compramos.
   Estilo em src/css/tema.css (.mm-venda, .mm-v*). */
(function () {
  if (!/^\/venda-suas-cartas\/?$/.test(location.pathname)) return;
  const textoDoAdmin = document.querySelector(".container.mt-4.mb-5, [data-store='page-content'], .user-content");
  if (!textoDoAdmin || document.querySelector(".mm-venda")) return;

  const FAIXA = null;   // ex.: [40, 60], percentuais do preço de venda; null = texto sem número até o Caio fechar
  const WHATSAPP = MM.whatsapp("Olá! Quero vender minhas cartas para a Mr. Mimic");   // o número não aparece escrito
  const INSTAGRAM = MM.contato.instagram, EMAIL = MM.contato.email;
  // ícones SVG (24x24) usados nos passos e nos quadros
  const I = {
    zap: '<svg viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 2.3 17.7L1 23l5.5-1.4A11.8 11.8 0 0 0 20.5 3.5zm-8.4 18.2c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.3.9.9-3.2-.2-.4a9.8 9.8 0 1 1 8 4.3zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/></svg>',
    foto: '<svg viewBox="0 0 24 24"><path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm8 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>',
    lupa: '<svg viewBox="0 0 24 24"><path d="M10 2a8 8 0 0 1 6.3 12.9l5.4 5.4-1.4 1.4-5.4-5.4A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-1 3h2v2h2v2h-2v2H9v-2H7V9h2V7z"/></svg>',
    lista: '<svg viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm2 2h3v3H7V7zm5 1h5v1h-5V8zM7 12h3v3H7v-3zm5 1h5v1h-5v-1z"/></svg>',
    pix: '<svg viewBox="0 0 24 24"><path d="M12 2l2.5 2.5h3.3L20 6.7v3.3L22 12l-2 2v3.3l-2.2 2.2h-3.3L12 22l-2.5-2.5H6.2L4 17.3V14l-2-2 2-2V6.7l2.2-2.2h3.3L12 2zm0 4.5L7.5 11 12 15.5 16.5 11 12 6.5zm0 2.8L14.2 11 12 13.2 9.8 11 12 9.3z"/></svg>',
    carta: '<svg viewBox="0 0 24 24"><path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 2h8v6H8V6zm1 8h6v1.5H9V14zm0 3h4v1.5H9V17z"/></svg>',
    pasta: '<svg viewBox="0 0 24 24"><path d="M3 5h7l2 2h9v12a2 2 0 0 1-2 2H3V5zm2 2v10h14V9h-7.8l-2-2H5z"/></svg>',
    caixa: '<svg viewBox="0 0 24 24"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.3L5.6 7.8 12 11.4l6.4-3.6L12 4.3zM5 9.5v6.3l6 3.3v-6.3L5 9.5zm14 0l-6 3.3v6.3l6-3.3V9.5z"/></svg>',
    correio: '<svg viewBox="0 0 24 24"><path d="M3 6h18v12H3V6zm2 2v1.2l7 4.4 7-4.4V8H5zm0 3.6V16h14v-4.4l-7 4.4-7-4.4z"/></svg>',
    aperto: '<svg viewBox="0 0 24 24"><path d="M11 4l3 2 3-2 5 3-4 7-2-1-1 1c-.6.6-1.5.6-2.1 0l-.4-.4-1.5 1.5c-.6.6-1.6.6-2.2 0l-.4-.4L6 17l-4-7 5-3 2 1 2-4zm.7 2.5L10 9.8l-2-1-2.3 1.4 2.3 4.1 2.3-2.3 1.4 1.4-1.3 1.3.6.6 1.5-1.5 1.4 1.4-.7.7.7.7 1.6-1.6 1.5.8 2.4-4.2L17 8.9l-3 2-2.3-1.6-.1-.1v-.1l.1-2.6z"/></svg>',
    game: '<svg viewBox="0 0 24 24"><path d="M7 6h10a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5h-1.5l-1.5-2h-4l-1.5 2H7a5 5 0 0 1-5-5v-2a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h.5l1.5-2h6l1.5 2h.5a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3H7zm1 2h2v2h2v2h-2v2H8v-2H6v-2h2v-2zm8 0h2v2h-2v-2zm-2 2h2v2h-2v-2z"/></svg>',
    figure: '<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM8 9h8l1 5h-2v8h-2v-5h-2v5H9v-8H7l1-5zm-4 10h16v2H4v-2z"/></svg>',
    sleeve: '<svg viewBox="0 0 24 24"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h10V4H7zm2 3h6v10H9V7z"/></svg>',
  };
  const PASSOS = [
    { titulo: "Manda foto ou lista", texto: "no WhatsApp, no Instagram ou por e-mail. Pode ser foto da pasta mesmo.", icone: I.foto },
    { titulo: "Avaliamos carta a carta", texto: "estado, raridade e o que ela vale hoje.", icone: I.lupa },
    { titulo: "Você recebe a oferta aberta", texto: "item por item, pra conferir cada número.", icone: I.lista },
    { titulo: "Fechou? Conferimos e pagamos", texto: "Pix em até 1 dia útil depois de conferir — pelo correio ou presencial.", icone: I.pix },
  ];
  const COMPRAMOS = [
    { titulo: "Cartas avulsas", texto: "Da comum à ilustração secreta — nacional, japonesa ou inglesa.", icone: I.carta, cor: "#FFD12E" },
    { titulo: "Coleções inteiras", texto: "Pasta cheia, caixa parada há anos, herança de coleção.", icone: I.pasta, cor: "#E0479B" },
    { titulo: "Lacrados", texto: "Booster box, blister, box de coleção e deck, com selo intacto.", icone: I.caixa, cor: "#7B5CFF" },
    { titulo: "Acessórios", texto: "Sleeves e cases em bom estado, em quantidade.", icone: I.sleeve, cor: "#9CFF3D" },
    { titulo: "Games e consoles", texto: "Nintendo, PlayStation e retrô — funcionando, de preferência completos na caixa.", icone: I.game, cor: "#35D6FF" },
    { titulo: "Figures", texto: "Pokémon, Nendoroid, Funko e afins — na caixa ou impecáveis.", icone: I.figure, cor: "#FF9F1C" },
  ];
  const NAO_COMPRAMOS = ["Carta com vinco, corte, canto comido ou cola", "Proxy, réplica ou impressão caseira", "Lote fechado sem lista nem foto"];
  const sec = document.createElement("div");
  sec.className = "mm-venda";
  sec.innerHTML = `
    <section class="mm-vhero">
      <div class="mm-vtxt">
        <div class="mm-veb">VENDA PRA GENTE</div>
        <h2>Compramos a sua coleção</h2>
        <p>Carta avulsa, pasta inteira ou lacrado. Avaliação carta a carta e <b>Pix em até 1 dia útil depois da conferência</b>.</p>
        <a class="mm-vbtn" href="${WHATSAPP}" target="_blank" rel="noopener">${I.zap} Mandar minha lista no WhatsApp</a>
      </div>
      <img class="mm-vmascote" src="${MM.asset("hero/p5-moedas2.webp")}" alt="Mr. Mimic devolvendo moedas pelas cartas">
    </section>
    <section class="mm-vpassos">
      <h3>Como funciona</h3>
      <ol>${PASSOS.map((p, i) => `<li><span class="mm-vn">${i + 1}</span><span class="mm-vi">${p.icone}</span><b>${p.titulo}</b><small>${p.texto}</small></li>`).join("")}</ol>
    </section>
    <section class="mm-vjeitos">
      <h3>Dois jeitos de fechar</h3>
      <div class="mm-vgrade mm-vgrade2">
        <div class="mm-vtile" style="--cor:#FFD12E"><span class="mm-vi">${I.correio}</span><b>Manda pelo correio</b><small>Fechou a oferta, passamos o endereço. Conferimos tudo em <strong>até 1 dia útil</strong> depois que chega e o Pix sai na sequência. Se algo vier diferente do combinado, avisamos antes de pagar: você aceita o ajuste ou recebe as cartas de volta (frete da volta por sua conta).</small></div>
        <div class="mm-vtile" style="--cor:#9CFF3D"><span class="mm-vi">${I.aperto}</span><b>Presencial, se você é de SP</b><small>Marcamos um encontro e conferimos na sua frente. Lote pequeno, <strong>Pix na hora</strong>; coleção grande, em até 1 dia útil. Melhor jeito para quem tem muita carta.</small></div>
      </div>
      <p class="mm-vregra">Conferimos toda carta antes de pagar — é o que garante um negócio justo para os dois lados.</p>
    </section>
    <section class="mm-vquanto">
      <h3>Quanto pagamos</h3>
      <div class="mm-vquanto-box">
        <p class="mm-vq-lead">${FAIXA ? `A oferta fica, em geral, entre <b>${FAIXA[0]}% e ${FAIXA[1]}%</b> do preço de venda real da carta.` : `A oferta é uma <b>parte</b> do preço de venda real da carta.`} A conta inclui a nossa margem, a comissão do canal, o frete e o tempo até ela encontrar um novo dono.</p>
        <ul class="mm-vq-lista">
          <li><span class="mm-vq-mais">▲ sobe</span> carta NM, de giro rápido, raridade alta, japonesa ou lacrado intacto</li>
          <li><span class="mm-vq-menos">▼ desce</span> comum, com marca de uso, coleção antiga parada ou lote sem lista</li>
        </ul>
        <p class="mm-vq-nota">Dica honesta: preço de anúncio não é preço de venda. A nossa oferta parte do que a carta vende de verdade, vem aberta item por item, e o pagamento é certo.</p>
      </div>
    </section>
    <section class="mm-vcompro">
      <h3>O que compramos</h3>
      <div class="mm-vgrade">${COMPRAMOS.map(c => `<div class="mm-vtile" style="--cor:${c.cor}"><span class="mm-vi">${c.icone}</span><b>${c.titulo}</b><small>${c.texto}</small></div>`).join("")}</div>
      <div class="mm-vnao"><b>O que não compramos:</b> ${NAO_COMPRAMOS.map(n => `<span>✕ ${n}</span>`).join("")}</div>
    </section>
    <section class="mm-vfim">
      <a class="mm-vbtn" href="${WHATSAPP}" target="_blank" rel="noopener">${I.zap} Mandar minha lista no WhatsApp</a>
      <small>Prefere outro canal? Chame no <a href="${INSTAGRAM}" target="_blank" rel="noopener">Instagram @mrmimicbr</a> ou mande para <a href="mailto:${EMAIL}">${EMAIL}</a>. Você recebe a oferta item por item e decide com calma.</small>
    </section>`;
  textoDoAdmin.replaceWith(sec);
  const filtros = document.querySelector(".category-controls-container"); if (filtros) filtros.style.display = "none";
  const h1 = document.querySelector(".page-header h1"); if (h1) h1.style.display = "none";   // o topo da página já é o título
})();
