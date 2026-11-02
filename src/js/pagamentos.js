/* Rodapé: formas de pagamento aceitas e CNPJ legível (pedido do Caio, 02/11/2026).
   A lista segue o que a loja aceita no Nuvem Pago; os logos são os do próprio CDN da Nuvemshop.
   Selo só entra aqui se for real: nada de "loja certificada" sem certificação. */
(function () {
  const rodape = document.querySelector("footer");
  if (!rodape || rodape.querySelector(".mm-pagamentos")) return;

  const BASE = "https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/";
  const LOGOS = [
    ["payment-method-types/pix", "Pix"],
    ["visa", "Visa"],
    ["mastercard", "Mastercard"],
    ["br/elo", "Elo"],
    ["br/hipercard", "Hipercard"],
    ["amex", "American Express"],
    ["payment-method-types/boleto", "Boleto"]
  ];

  const bloco = document.createElement("div");
  bloco.className = "mm-pagamentos";
  bloco.innerHTML = `<span class="mm-pagamentos-titulo">Formas de pagamento</span>
    <ul class="mm-pagamentos-lista">${LOGOS.map(([arquivo, nome]) =>
      `<li><img src="${BASE}${arquivo}@2x.png" alt="${nome}" title="${nome}" loading="lazy"></li>`).join("")}</ul>`;

  // O mm.js carrega dentro do rodapé, antes da assinatura e do copyright: só dá para mexer neles depois do parse.
  const aplicar = () => {
    const assinatura = rodape.querySelector(".powered-by-logo");
    const ancora = assinatura ? assinatura.parentElement : null;
    if (ancora) ancora.insertAdjacentElement("beforebegin", bloco);
    else rodape.querySelector(".container").append(bloco);

    // O tema escreve o CNPJ só com dígitos e em letra mínima.
    const copyright = [...rodape.querySelectorAll(".font-smallest")].find(el => /copyright/i.test(el.textContent));
    if (copyright) {
      copyright.textContent = copyright.textContent.trim()
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "CNPJ $1.$2.$3/$4-$5");
      copyright.classList.add("mm-cnpj");
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", aplicar);
  else aplicar();
})();
