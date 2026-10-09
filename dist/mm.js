/* Mr. Mimic: scripts do tema na loja real. GERADO por build.py a partir de src/; não editar aqui. */
(function () {
  var eu = (document.currentScript && document.currentScript.src) || "";
  var base = eu ? eu.replace(/dist\/[^\/]*$/, "") : "https://cdn.jsdelivr.net/gh/CaioRPeres/mr-mimic-site@92d2d55ea43998895f79bae92ea2abd1a182408a/";
  window.MM = {
    asset: function (caminho) { return base + "assets/" + caminho; },
    naHome: function () { return !!document.querySelector('[data-store^="home-"]'); },
    cores: {"ambipom 107/094 - fogo fantasmagórico (me02) - ilustração rara": "rgb(124,255,125)", "blister duplo com moeda - celebração de 30 anos (pt)": "rgb(255,229,127)", "booster display me05 escuridão absoluta (pt) - 36 boosters": "rgb(255,124,117)", "box coleção com pôster - celebração de 30 anos (pt)": "rgb(255,233,57)", "case magnético 4mm cards bra - unitário": "rgb(0,146,255)", "case magnético bra 55pt - unitário": "rgb(13,105,255)", "clarita 109/084 - escuridão absoluta (me05) - ultra rara": "rgb(255,178,120)", "cobalion ex 064/086 - caos ascendente (me04) - rara dupla": "rgb(15,231,255)", "crobat 093/086 - caos ascendente (me04) - ilustração rara": "rgb(129,108,255)", "dawn 118/094 - fogo fantasmagórico (me02) - ultra rara": "rgb(255,159,136)", "double sleeve bra - 200 unidades": "rgb(0,116,255)", "double sleeve premium bra - 180 unidades": "rgb(255,0,0)", "jaula de batalha 116/094 - fogo fantasmagórico (me02) - ultra rara": "rgb(255,120,229)", "manectric 089/084 - escuridão absoluta (me05) - ilustração rara": "rgb(255,229,97)", "martelo esmagador 105/084 - escuridão absoluta (me05) - ultra rara": "rgb(255,234,120)", "mega darkrai ex 101/084 - escuridão absoluta (me05) - ultra rara": "rgb(196,255,67)", "mega zeraora ex 027/084 - escuridão absoluta (me05) - rara dupla": "rgb(255,228,111)", "mega zeraora ex 114/084 - escuridão absoluta (me05) - ilustração rara especial": "rgb(100,202,255)", "morpeko ex 117/084 - escuridão absoluta (me05) - ilustração rara especial": "rgb(255,74,201)", "pasta premium 1x1 bra - rosa": "rgb(255,129,140)", "pasta premium 1x1 bra - roxa": "rgb(121,58,255)", "rampardos ex 045/084 - escuridão absoluta (me05) - rara dupla": "rgb(255,168,48)", "rotom ex 111/094 - fogo fantasmagórico (me02) - ultra rara": "rgb(0,174,255)", "sleeve básico duplo cards bra - transparente - 200 unidades": "rgb(0,119,255)", "sleeve colors bra - azul - 50 unidades": "rgb(0,99,255)", "sleeve colors bra - verde - 50 unidades": "rgb(255,0,0)", "sleeve colors bra - vermelho - 50 unidades": "rgb(255,0,0)", "sleeve sabores bra - banana - amarelo - 60 unidades": "rgb(255,192,0)", "sleeve sabores bra - cereja - vermelho - 60 unidades": "rgb(255,0,0)", "sliggo 095/086 - caos ascendente (me04) - ilustração rara": "rgb(110,255,122)", "toploader cristal bra - 25 unidades": "rgb(0,91,255)", "toucannon 094/084 - escuridão absoluta (me05) - ilustração rara": "rgb(107,255,252)", "xerneas 091/086 - caos ascendente (me04) - ilustração rara": "rgb(132,226,255)"},
    contato: {"whatsapp": "5522999975004", "instagram": "https://www.instagram.com/mrmimicbr/", "email": "contato@mrmimic.com.br"},
    whatsapp: function (mensagem) { return "https://wa.me/" + this.contato.whatsapp + "?text=" + encodeURIComponent(mensagem); }
  };
  if (!document.getElementById("mm-extra")) {
    var estilo = document.createElement("style"); estilo.id = "mm-extra";
    estilo.textContent = ".btn-primary:active,.btn-secondary:active,.btn-default:active{transform:translate(2px,2px);box-shadow:2px 2px 0 #241B38!important}.btn-link:hover{transform:none;color:#241B38!important}.newsletter-btn:hover{background:#F3CD77!important}.section-slider .swiper-button-prev:hover,.section-slider .swiper-button-next:hover{opacity:1;background-color:#FFD12E!important}.js-product-form>.text-accent:not([style*=\"none\"]) ~ .row .font-smallest{display:none}a.mm-cta{display:inline-block;background:#FFD12E;color:#241B38!important;font-family:'Figtree',sans-serif;font-weight:700;font-size:1.1rem;padding:14px 30px;margin:10px 0 6px;border:3px solid #241B38;border-radius:999px;text-decoration:none!important;box-shadow:4px 4px 0 #241B38;transition:transform .12s ease,box-shadow .12s ease}a.mm-cta strong{font-weight:700;color:#241B38}a.mm-cta:hover{background:#F3CD77;transform:translate(-2px,-2px);box-shadow:6px 6px 0 #241B38}a:hover{color:#FFEC99!important}.btn-primary:hover{box-shadow:7px 7px 0 #090612!important}#mm-filtros .linha{max-width:1560px!important}.js-slider,[class*=slider]:has(img[alt*=\"Carrossel\"]),[class*=swiper]:has(img[alt*=\"Carrossel\"]){max-width:1440px!important;margin-left:auto!important;margin-right:auto!important}@media (max-width:1200px){.js-slider,[class*=slider]:has(img[alt*=\"Carrossel\"]),[class*=swiper]:has(img[alt*=\"Carrossel\"]){max-width:100%!important}}.btn-primary:hover{transform:translate(-2px,-2px)}.btn-secondary:hover,.btn-default:hover{border-color:#FFD12E!important;color:#FFD12E!important;transform:none!important;box-shadow:none!important}.swiper-slide:has(>.js-item-product){border:0!important;background:transparent!important;box-shadow:none!important;outline:0!important}.form-control:focus{border-color:#FFD12E!important;outline:0!important}.item:hover{transform:translate(-2px,-3px)!important}#mm-filtros{padding:12px 16px}#mm-filtros button.f,#mm-filtros select{border-width:1.5px!important;box-shadow:none!important;font-size:13px}#mm-filtros button.f.on{border-color:#FFD12E!important}.swiper-slide:has(>.js-item-product),.js-product-table .item-product,.item-product{display:flex!important;height:auto!important}.swiper-wrapper:has(.js-item-product){align-items:stretch!important}.section-featured-home .swiper-button-next:hover{opacity:1;transform:translateX(3px)}.section-featured-home .swiper-button-prev:hover{opacity:1;transform:scaleX(-1) translateX(3px)}@media(max-width:640px){.mm-verttudo{margin-top:6px!important;font-size:13px!important}}.item:hover{box-shadow:6px 7px 0 var(--cor,#FFD12E)!important;border-color:var(--cor,#FFD12E)!important}.item:hover .item-image{border-bottom-color:var(--cor,#FFD12E)!important}@media (max-width:767px){.item:hover{box-shadow:5px 6px 0 var(--cor,#FFD12E)!important}}h1.js-product-name .mm-sub{display:block;font-family:Figtree,system-ui,sans-serif;font-weight:600;font-size:14px;line-height:1.3;letter-spacing:0;color:#C9BCEB;text-shadow:none;margin-top:6px}@media(max-width:640px){h1.js-product-name .mm-sub{font-size:13px}}@media(max-width:640px){.row:has(>.js-product-quantity-container)>[class*=\"col-\"]{flex:0 0 100%!important;max-width:100%!important;padding-right:15px!important}}.products-section .swiper-button-next:hover{opacity:1;transform:translateX(3px)}.products-section .swiper-button-prev:hover{opacity:1;transform:scaleX(-1) translateX(3px)}.js-swiper-product-prev:hover,.js-swiper-product-next:hover{opacity:1}.input-append .btn:hover,.input-append input.btn:hover{background:#FFE066!important;transform:none!important;box-shadow:none!important}.js-home-sections-container section:has(.input-append){padding-top:28px!important;padding-bottom:28px!important}section:has(.input-append) h2,section:has(.input-append) .section-title,section:has(.input-append) h4{font-size:26px!important;margin-bottom:4px!important}section:has(.input-append) p{font-size:15px!important;color:#C9BCEB!important}.mm-redes{display:flex;justify-content:center;gap:14px;margin:10px 0 4px}.mm-rede{width:46px;height:46px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;background:rgba(49,38,84,.6);transition:transform .15s,background .15s,color .15s,border-color .15s}.mm-rede svg{width:22px;height:22px;fill:currentColor}.mm-rede:hover{background:#FFD12E;border-color:#FFD12E}@media(max-width:640px){.mm-rede{width:50px;height:50px}.mm-rede svg{width:24px;height:24px}}.mm-rede{border:0!important;color:#fff!important}.mm-rede[aria-label=\"WhatsApp\"]{background:#25D366!important}.mm-rede[aria-label=\"Instagram\"]{background:radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285AEB 90%)!important}.mm-rede[aria-label=\"YouTube\"]{background:#F00!important}.mm-rede:hover{color:#fff!important;transform:translateY(-2px) scale(1.06);filter:brightness(1.08)}.js-product-form.mm-toploader::after{content:\"✔ Embalagem reforçada — carta vai em sleeve + toploader, lacrado vai em caixa\\A✔ Pix, cartão ou boleto — pagamento seguro (Nuvem Pago)\\A✔ Conferido à mão por quem também coleciona\"!important}.mm-proteja{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:14px 0 6px}.mm-prot{display:flex;flex-direction:column;background:#312654;border:2px solid #090612;border-radius:14px;box-shadow:4px 4px 0 #090612;overflow:hidden;text-decoration:none!important;color:#F4EDE1!important;transition:transform .15s,box-shadow .15s}.mm-prot:hover{transform:translate(-2px,-3px)}.mm-prot-img{display:block;background:#211839;aspect-ratio:1/1;padding:10px}.mm-prot-img img{width:100%;height:100%;object-fit:contain;display:block}.mm-prot-txt{display:flex;flex-direction:column;gap:3px;padding:10px 12px 4px;flex:1}.mm-prot-txt b{font:700 14px/1.25 Figtree,system-ui}.mm-prot-txt small{font:500 12px/1.3 Figtree,system-ui;color:#B9AEDA}.mm-prot-preco{font:600 14px Figtree,system-ui;color:#E4DCF5;margin-top:4px}.mm-prot-btn{margin:8px 12px 12px;align-self:flex-start;background:#FFD12E;color:#241B38;font:800 13px/1 Figtree,system-ui;padding:9px 16px;border-radius:999px}.mm-proteja-mais{margin:6px 0 14px}.mm-proteja-mais a{color:#FFD12E!important;font:700 14px Figtree,system-ui;text-decoration:none}@media(max-width:640px){.mm-proteja{grid-template-columns:1fr 1fr;gap:10px}.mm-prot-txt small{display:none}}.mm-prot .mm-prot-btn,.user-content a .mm-prot-btn{color:#241B38!important}.mm-prot .mm-prot-txt b,.mm-prot .mm-prot-txt small,.mm-prot .mm-prot-preco{text-decoration:none!important}.mm-proteja-box{background:#1B1434;border:1.5px solid #4A3B70;border-radius:18px;padding:18px 18px 12px;margin:22px 0}.user-content h3.mm-proteja-titulo{color:#FFD12E!important;font-size:28px!important;margin:0 0 6px!important;text-shadow:2px 2px 0 #090612}.user-content h3.mm-proteja-titulo::before{content:\"COMBINA COM ESTA CARTA\";display:block;font:800 11px/1 Figtree,system-ui;letter-spacing:.1em;color:#9CFF3D;margin-bottom:8px;text-shadow:none}.mm-proteja-box>p{margin-bottom:10px}.mm-prot:hover{box-shadow:6px 7px 0 var(--cor,#FFD12E);border-color:var(--cor,#FFD12E)}.user-content h3.mm-proteja-titulo:not(#mm){color:#FFD12E!important}.mm-venda{max-width:1400px;margin:0 auto 40px;padding:0 16px}.mm-vhero{position:relative;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:24px;min-height:380px;padding:24px 32px;border-radius:22px;overflow:hidden;background:#1B1434;border:2px solid #090612;box-shadow:6px 6px 0 #090612}.mm-vtxt{position:relative;z-index:1}.mm-veb{font:800 13px/1 Figtree,system-ui;letter-spacing:.14em;color:#FFD12E;margin-bottom:12px}.mm-vhero h2{font-family:'Londrina Solid',sans-serif;font-weight:900;font-size:52px;line-height:1;color:#F4EDE1;text-shadow:3px 3px 0 #090612;margin:0 0 12px}.mm-vhero p{font:500 17px/1.45 Figtree,system-ui;color:#C9BCEB;margin:0 0 20px;max-width:520px}.mm-vhero p b{color:#9CFF3D;font-weight:800}.mm-vmascote{position:relative;z-index:1;width:100%;max-width:420px;justify-self:center;filter:drop-shadow(0 14px 22px rgba(6,4,14,.5))}.mm-vbtn{display:inline-flex;align-items:center;gap:10px;background:#FFD12E!important;color:#241B38!important;font:800 17px/1 Figtree,system-ui;padding:16px 24px;border-radius:999px;border:2px solid #090612;box-shadow:4px 4px 0 #090612;text-decoration:none!important;transition:transform .15s,box-shadow .15s}.mm-vbtn:hover{transform:translate(-1px,-2px);box-shadow:6px 7px 0 #090612}.mm-vbtn svg{width:22px;height:22px;fill:#241B38}.mm-venda h3{font-family:'Londrina Solid',sans-serif;font-weight:900;font-size:32px;color:#F4EDE1;text-shadow:2px 2px 0 #3A2C5E;text-align:center;margin:44px 0 18px}.mm-vpassos ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;counter-reset:p}.mm-vpassos li{position:relative;background:#312654;border:2px solid #090612;border-radius:16px;box-shadow:4px 4px 0 #090612;padding:22px 18px 18px;display:flex;flex-direction:column;gap:6px}.mm-vn{position:absolute;top:-14px;left:16px;width:32px;height:32px;border-radius:999px;background:#FFD12E;color:#241B38;font:900 16px/32px Figtree,system-ui;text-align:center;border:2px solid #090612}.mm-vi{display:inline-flex;width:48px;height:48px;border-radius:12px;background:#211839;align-items:center;justify-content:center;margin:6px 0 4px}.mm-vi svg{width:26px;height:26px;fill:#FFD12E}.mm-vpassos b{font:800 17px/1.2 Figtree,system-ui;color:#F4EDE1}.mm-vpassos small{font:500 14px/1.4 Figtree,system-ui;color:#C9BCEB}.mm-vgrade{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.mm-vtile{background:#312654;border:2px solid #090612;border-radius:16px;box-shadow:4px 4px 0 #090612;padding:18px;display:flex;flex-direction:column;gap:6px;transition:transform .15s,box-shadow .15s,border-color .15s}.mm-vtile:hover{transform:translate(-2px,-3px);box-shadow:6px 7px 0 var(--cor);border-color:var(--cor)}.mm-vtile .mm-vi svg{fill:var(--cor)}.mm-vtile b{font:800 17px/1.2 Figtree,system-ui;color:var(--cor)}.mm-vtile small{font:500 14px/1.4 Figtree,system-ui;color:#C9BCEB}.mm-vnao{margin:18px 0 0;font:500 14px/1.6 Figtree,system-ui;color:#B9AEDA;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}.mm-vnao b{color:#F4EDE1}.mm-vnao span{background:#211839;border:1px solid #4A3B70;border-radius:999px;padding:5px 12px;color:#E4DCF5}.mm-vfim{text-align:center;margin-top:44px;display:flex;flex-direction:column;align-items:center;gap:12px}.mm-vfim small{font:500 14px Figtree,system-ui;color:#B9AEDA}@media(max-width:900px){.mm-vpassos ol,.mm-vgrade{grid-template-columns:1fr 1fr}}@media(max-width:640px){.mm-vhero{grid-template-columns:1fr;padding:22px 18px;text-align:center;min-height:0}.mm-vhero h2{font-size:38px}.mm-vhero p{margin-left:auto;margin-right:auto;font-size:16px}.mm-vmascote{max-width:260px;order:-1}.mm-venda h3{font-size:26px;margin-top:32px}.mm-vpassos ol,.mm-vgrade{grid-template-columns:1fr;gap:20px}.mm-vbtn{font-size:16px;padding:15px 20px}}.mm-vfim small{max-width:560px;line-height:1.5}.mm-vgrade2{grid-template-columns:1fr 1fr;max-width:1000px;margin:0 auto}.mm-vgrade2 .mm-vtile small{font-size:15px;line-height:1.5;color:#D6CBEE}.mm-vgrade2 .mm-vtile small strong{color:#F4EDE1;font-weight:800}.mm-vregra{text-align:center;margin:16px auto 0;max-width:640px;font:600 14px/1.5 Figtree,system-ui;color:#B9AEDA}@media(max-width:640px){.mm-vgrade2{grid-template-columns:1fr}}.mm-vcompro .mm-vgrade{grid-template-columns:repeat(3,1fr)}@media(max-width:900px){.mm-vcompro .mm-vgrade{grid-template-columns:1fr 1fr}}@media(max-width:640px){.mm-vcompro .mm-vgrade{grid-template-columns:1fr}}.mm-vquanto-box{max-width:820px;margin:0 auto;background:#1B1434;border:1.5px solid #4A3B70;border-radius:18px;padding:22px 24px}.mm-vq-lead{font:500 17px/1.5 Figtree,system-ui;color:#E4DCF5;margin:0 0 14px}.mm-vq-lead b{color:#FFD12E;font-weight:800}.mm-vq-lista{list-style:none;margin:0 0 14px;padding:0;display:grid;gap:8px}.mm-vq-lista li{font:500 15px/1.5 Figtree,system-ui;color:#C9BCEB;display:flex;gap:10px;align-items:baseline}.mm-vq-mais,.mm-vq-menos{flex:0 0 auto;font:800 12px/1 Figtree,system-ui;letter-spacing:.06em;border-radius:999px;padding:5px 10px}.mm-vq-mais{background:#9CFF3D;color:#152600}.mm-vq-menos{background:#4A3B70;color:#E4DCF5}.mm-vq-nota{font:500 14px/1.5 Figtree,system-ui;color:#B9AEDA;margin:0;border-top:1px dashed #4A3B70;padding-top:12px}@media(max-width:640px){.mm-vquanto-box{padding:18px 16px}.mm-vq-lead{font-size:16px}}.mm-vq-lista .mm-vq-mais:not(#mm){color:#152600!important;background:#9CFF3D!important}.mm-vq-lista .mm-vq-menos:not(#mm){color:#E4DCF5!important;background:#4A3B70!important}.mm-rede[aria-label=\"E-mail\"]{background:#FFD12E!important;color:#241B38!important}.mm-rede-mail{display:block;text-align:center;margin:10px 0 2px;font:600 14px Figtree,system-ui;color:#C9BCEB!important;text-decoration:none}.mm-rede-mail:hover{color:#FFD12E!important;text-decoration:underline}.mm-pg .cx .mm-ctl{display:inline-block;margin-top:8px;font:700 15px Figtree,system-ui;color:#FFD12E!important;text-decoration:none}.mm-pg .cx .mm-ctl:hover{text-decoration:underline}.mm-breve .item-image{position:relative}.mm-breve .js-price-display::before{content:\"\\1F514  \"}.mm-breve .label.js-free-shipping-minimum-label{display:none!important}.mm-breve .item-image img{opacity:.96}.category-controls .btn:hover,.category-controls button:hover{border-color:#FFD12E!important;color:#FFD12E!important}.category-controls a.js-modal-open.btn-link:hover{border-color:#FFD12E!important;color:#FFD12E!important}@media (min-width:821px){.mm-hero .mmh-quadro{max-width:none!important;width:100%!important;height:28.59vw!important;max-height:549px!important}.mm-hero .mmh-slide.banner{border-radius:0!important}.mm-hero .mmh-seta.esq{left:16px!important}.mm-hero .mmh-seta.dir{right:16px!important}}@media (min-width:1921px){.mm-hero .mmh-slide.full .mmh-full{object-fit:contain!important;mask-image:linear-gradient(90deg,transparent 0,#000 12%,#000 88%,transparent 100%)}}.head-main .nav-desktop-list>.nav-dropdown:hover>.nav-item-container>a::after{transform:translateY(3px) rotate(225deg)}.head-main .nav-dropdown-content .desktop-list-subitems>li>.nav-item-container>a:hover{color:#FFD12E!important}.head-main .nav-dropdown-content .list-subitems .list-subitems a:hover{color:#FFD12E!important;transform:translateX(3px)!important}.modal-nav-hamburger .nav-list-link:hover,.modal-nav-hamburger .nav-list-link:focus-visible{color:#FFD12E!important}.mm-hero{position:relative;overflow:visible;background:#15102A;margin:0 0 8px}.mm-hero .mmh-quadro{position:relative;max-width:1400px;margin:0 auto;height:400px;overflow:visible}.mm-hero .mmh-slide{position:absolute;inset:0;width:100%;height:100%;z-index:1;display:flex;align-items:center;justify-content:flex-start;opacity:0;transition:opacity .5s ease;pointer-events:none}.mm-hero .mmh-slide.on{opacity:1;pointer-events:auto}.mm-hero .mmh-texto{width:50%;padding:0 0 0 8px}.mm-hero .mmh-eb{font:700 13px/1 Figtree,system-ui;letter-spacing:.18em;color:#FFD12E;margin-bottom:12px}.mm-hero h2{font-family:'Londrina Solid',sans-serif;font-weight:900;font-size:60px!important;line-height:1!important;color:#F4EDE1;margin:0 0 16px!important;text-shadow:3px 3px 0 #2A2046!important;max-width:11ch}.mm-hero .mmh-s1{font:500 16px/1.4 Figtree,system-ui;color:#C9BCEB}.mm-hero .mmh-s2{font:700 16px/1.4 Figtree,system-ui;color:#F4EDE1;margin-top:2px}.mm-hero .mmh-cta{display:inline-flex;align-items:center;height:44px;padding:0 22px;margin-top:24px;background:#FFD12E;color:#241B38;font:700 15px/1 Figtree,system-ui!important;text-decoration:none!important;border:3px solid #090612;border-radius:999px;box-shadow:4px 4px 0 #090612;color:#241B38!important}.mm-hero .mmh-cta:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #090612;color:#241B38!important}.mm-hero .mmh-arte{position:absolute;right:0;top:0;bottom:0;width:50%;display:flex;align-items:center;justify-content:center}.mm-hero .mmh-arte img{display:block;opacity:1!important;visibility:visible!important;width:auto;height:auto;max-height:340px;max-width:92%;filter:drop-shadow(0 14px 22px rgba(6,4,14,.5))}.mm-hero .mmh-arte.com-bg{overflow:hidden;width:58%;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 40%);mask-image:linear-gradient(to right,transparent 0,#000 40%)}.mm-hero .mmh-arte img.mmh-bg{position:absolute;inset:0;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover;object-position:60% 40%;z-index:0;filter:brightness(.42) saturate(.7) blur(1px)!important;opacity:1!important}.mm-hero .mmh-arte.com-bg::after{content:\"\";position:absolute;inset:0;z-index:0;background:linear-gradient(90deg,rgba(21,16,42,.6),rgba(21,16,42,.25));pointer-events:none}.mm-hero .mmh-arte.com-bg img.mmh-prod{position:relative;z-index:1;max-height:322px;max-width:92%;margin:0 0 10px;filter:drop-shadow(0 14px 22px rgba(6,4,14,.5))}.mm-hero .mmh-slide.full{background:#15102A}.mm-hero .mmh-slide.full .mmh-full{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:62% 50%;z-index:0;max-height:none!important;max-width:none!important}.mm-hero .mmh-slide.full::before{content:\"\";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(21,16,42,.96) 0,rgba(21,16,42,.82) 34%,rgba(21,16,42,.2) 60%,rgba(21,16,42,0) 100%)}.mm-hero .mmh-slide.full .mmh-texto{position:relative;z-index:2}.mm-hero .mmh-slide.full .mmh-arte{display:none}@media (max-width:820px){.mm-hero .mmh-slide.full .mmh-full{position:absolute;height:100%}.mm-hero .mmh-slide.full::before{background:linear-gradient(180deg,rgba(21,16,42,.35) 0,rgba(21,16,42,.92) 60%)}.mm-hero .mmh-slide.full{min-height:360px;justify-content:flex-end}}.mm-hero .mmh-slide.banner::before{display:none}.mm-hero .mmh-slide.banner .mmh-texto{display:none}.mm-hero .mmh-slide.banner .mmh-full{object-position:center;cursor:pointer}.mm-hero .mmh-slide.banner{border-radius:18px;overflow:hidden}.mm-hero .mmh-seta{position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:36px;height:36px;border-radius:999px;border:1.5px solid #4A3B70;background:rgba(36,27,56,.85);color:#E9E4F5;cursor:pointer;font:700 16px Figtree,system-ui;display:grid;place-items:center}.mm-hero .mmh-seta:hover{border-color:#FFD12E;color:#FFD12E}.mm-hero .mmh-seta.esq{left:-56px}.mm-hero .mmh-seta.dir{right:-56px}.mm-hero .mmh-pontos{position:absolute;left:0;right:0;bottom:-2px;z-index:3;display:flex;gap:8px;justify-content:center}.mm-hero .mmh-pt{width:8px;height:8px;border-radius:999px;background:#4A3B70;border:0;cursor:pointer;padding:0;transition:width .2s}.mm-hero .mmh-pt.on{background:#FFD12E;width:24px}@media (max-width:1500px){.mm-hero .mmh-seta.esq{left:8px}.mm-hero .mmh-seta.dir{right:8px}}@media (max-width:820px){.mm-hero .mmh-quadro{height:auto}.mm-hero .mmh-slide{position:relative;display:none;flex-direction:column-reverse;padding:16px 16px 28px}.mm-hero .mmh-slide.on{display:flex}.mm-hero .mmh-texto{width:100%;padding:16px 0 0;text-align:center}.mm-hero h2{font-size:40px!important;max-width:none;margin-left:auto;margin-right:auto}.mm-hero .mmh-arte{position:relative;width:100%;height:220px}.mm-hero .mmh-arte img{display:block;opacity:1!important;visibility:visible!important;width:auto;height:auto;max-height:200px}.mm-hero .mmh-arte.com-bg{height:220px;width:100%;-webkit-mask-image:none;mask-image:none;border-radius:16px}.mm-hero .mmh-arte.com-bg img.mmh-prod{max-height:200px}.mm-hero .mmh-seta{display:none}.mm-hero .mmh-slide.banner{padding:0 12px 26px;min-height:0;border-radius:0;overflow:visible}.mm-hero .mmh-slide.banner .mmh-full{position:relative;inset:auto;width:100%;height:auto;aspect-ratio:1/1;border-radius:16px;display:block}.mm-hero .mmh-slide.banner .mmh-arte{display:none}.mm-hero .mmh-slide.banner .mmh-blink{display:block;width:100%}}.mm-cats{max-width:1400px;margin:40px auto 8px;padding:0 8px}.mm-cats h2{font-family:'Londrina Solid',sans-serif;font-weight:900;font-size:32px;color:#F4EDE1;text-shadow:2px 2px 0 #3A2C5E;margin:0 0 16px;text-align:center}.mm-cats .grade{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}.mm-cats a.tile{position:relative;display:flex;flex-direction:column;justify-content:flex-end;height:200px;border-radius:14px;overflow:hidden;background:#312654;border:2px solid #090612;box-shadow:4px 4px 0 #090612;text-decoration:none;color:#F4EDE1;transition:transform .15s,box-shadow .15s}.mm-cats a.tile:hover{transform:translate(-2px,-3px);box-shadow:6px 7px 0 var(--cor);border-color:var(--cor)}.mm-cats .foto{position:absolute;inset:0;background-size:contain;background-position:center 38%;background-repeat:no-repeat;opacity:.95;transform:scale(.78)}.mm-cats .veu{position:absolute;inset:0;background:linear-gradient(180deg,rgba(49,38,84,0) 45%,#1B1434 100%)}.mm-cats .txt{position:relative;padding:12px 14px 12px}.mm-cats .nome{font:700 16px/1.2 Figtree,system-ui;color:#F4EDE1}.mm-cats .sub{font:500 12px/1.3 Figtree,system-ui;color:#B9AEDA;margin-top:3px}.mm-cats .breve .foto{display:none}.mm-cats .breve{background:repeating-linear-gradient(135deg,#2A2046 0 10px,#241B38 10px 20px)}.mm-cats .breve .nome{color:var(--cor)}.mm-cats .selo{position:absolute;top:10px;left:10px;font:700 11px/1 Figtree,system-ui;letter-spacing:.08em;color:#152600!important;background:#9CFF3D;border-radius:999px;padding:5px 9px}.mm-cats .mais{position:absolute;top:10px;right:10px;font:700 11px/1 Figtree,system-ui;letter-spacing:.08em;color:#241B38!important;background:#FFD12E;border-radius:999px;padding:5px 9px}@media (max-width:1100px){.mm-cats .grade{grid-template-columns:repeat(3,1fr)}}@media (max-width:640px){.mm-cats{margin-top:24px}.mm-cats h2{font-size:26px}.mm-cats .grade{grid-template-columns:repeat(2,1fr);gap:10px}.mm-cats a.tile{height:168px}.mm-cats .foto{transform:scale(.62);background-position:center 0}.mm-cats .veu{background:linear-gradient(180deg,rgba(49,38,84,0) 38%,#1B1434 78%)}.mm-cats .txt{padding:8px 10px 10px}.mm-cats .nome{font-size:14px}.mm-cats .sub{font-size:11px}}.mm-verttudo{display:block;text-align:center;margin:14px 0 0;font:700 14px Figtree,system-ui;color:#FFD12E!important;text-decoration:none}.mm-verttudo:hover{text-decoration:underline}.mm-rodape{position:relative;overflow:hidden;background-color:#241B38!important;background-image:var(--mm-textura)!important;background-size:576px 576px!important;background-repeat:repeat!important}.mm-rodape>.container{position:relative;z-index:1}.mm-rodape-arte{position:absolute;inset:0;z-index:0;pointer-events:none}.mm-rodape-esq,.mm-rodape-dir{position:absolute;bottom:26px}.mm-rodape-esq{left:max(20px,calc(50% - 720px))}.mm-rodape-dir{right:max(20px,calc(50% - 720px))}.mm-rodape-arte img{display:block;width:clamp(140px,13vw,232px);height:auto;filter:drop-shadow(0 12px 20px rgba(6,4,14,.55))}.mm-balao{position:absolute;left:68%;top:-58px;white-space:nowrap;padding:10px 16px 11px;background:#F4EDE1;color:#241B38!important;font:900 21px/1 'Londrina Solid',sans-serif;letter-spacing:.01em;border:3px solid #090612;border-radius:16px;box-shadow:4px 4px 0 #090612}.mm-balao::after{content:\"\";position:absolute;left:20px;bottom:-11px;width:16px;height:16px;background:#F4EDE1;border-right:3px solid #090612;border-bottom:3px solid #090612;transform:rotate(45deg)}@media (max-width:1180px){.mm-balao{display:none}}@media (max-width:820px){.mm-rodape-arte{position:relative;inset:auto;display:flex;justify-content:center;padding-top:26px}.mm-rodape-esq{position:relative;left:auto;bottom:auto}.mm-rodape-dir{display:none}.mm-rodape-arte img{width:124px}}";
    document.head.appendChild(estilo);
  }
})();
/* ===== hero.js ===== */
try {
/* Slider da home: seis banners prontos (gerados por banners/faz_banner.py), um por slide,
   com a versão larga (1920x549) e a de celular (1080x1080). Estilo em src/css/hero.css.
   Sem a luz em raios que vazava atrás do quadro (o Caio pediu para tirar, 07/10/2026).
   Escuridão Absoluta saiu em 08/10/2026: vendeu tudo e não vai repor. No lugar entrou a ETB de
   Destined Rivals, em primeiro, que é a peça cara com uma unidade só.
   Cartas avulsas refeito em 09/10/2026 (kits-site/faz_banner_avulsas.py): o antigo não tinha preço
   nenhum e mostrava as cartas cortadas. Agora o herói é o Charizard 4/102 a R$ 950, a faixa começa
   em R$ 4,90 e a peça não cita número de cartas, que muda toda semana. */
(function () {
  if (!MM.naHome()) return;

  const SLIDES = [
    { banner: "banner-etb-destined-rivals", href: "/produtos/elite-trainer-box-destined-rivals-en-pokemon-tcg/",
      texto: "Elite Trainer Box Destined Rivals, em inglês e lacrada, última em estoque" },
    { banner: "banner-30-anos", href: "/pokemon-tcg/",
      texto: "Celebração de 30 Anos: Box com Pôster e Blister Duplo, estoque novo" },
    { banner: "banner-cartas-avulsas", href: "/cartas-avulsas/",
      texto: "Cartas avulsas BR, EN e JP, do R$ 4,90 ao Charizard 4/102 de R$ 950" },
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

} catch (e) { console.warn("mm hero.js", e); }

/* ===== home-categorias.js ===== */
try {
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

} catch (e) { console.warn("mm home-categorias.js", e); }

/* ===== cor-card.js ===== */
try {
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

} catch (e) { console.warn("mm cor-card.js", e); }

/* ===== produto.js ===== */
try {
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

} catch (e) { console.warn("mm produto.js", e); }

/* ===== redes.js ===== */
try {
/* Rodapé: troca a lista de contato do tema por ícones (WhatsApp, Instagram, e-mail; YouTube oculto até existir canal)
   e o e-mail escrito embaixo. O número do WhatsApp não aparece escrito, só no link (decisão do Caio, 06/10/2026).
   Número, Instagram e e-mail ficam em src/dados/contato.json. */
(function () {
  const EMAIL = MM.contato.email;
  const LINKS = [
    { nome: "WhatsApp", href: MM.whatsapp("Olá! Vim pelo site da Mr. Mimic"),
      svg: '<path d="M20.5 3.5A11.8 11.8 0 0 0 2.3 17.7L1 23l5.5-1.4A11.8 11.8 0 0 0 20.5 3.5zm-8.4 18.2c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.3.9.9-3.2-.2-.4a9.8 9.8 0 1 1 8 4.3zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/>' },
    { nome: "Instagram", href: MM.contato.instagram,
      svg: '<path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.5.2-1.8.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.8C3.5 8.5 3.5 8.9 3.5 12s0 3.5.1 4.7c.1 1.1.2 1.5.3 1.8.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.8.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.5-.2 1.8-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.8.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.5-.3-1.8-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.8-.3-1.2-.1-1.6-.1-4.7-.1zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.2-2.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/>' },
    { nome: "E-mail", href: "mailto:" + EMAIL,
      svg: '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.4V17h16V7.4l-8 5.1-8-5.1zM5.2 7l6.8 4.3L18.8 7H5.2z"/>' },
    // YouTube: a loja ainda não tem canal (o @caioperes6876 é pessoal). Trocar o endereço e tirar "oculto" quando existir.
    { nome: "YouTube", href: "https://youtube.com/@mrmimicbr", oculto: true,
      svg: '<path d="M23 7.2a2.9 2.9 0 0 0-2-2C19.2 4.7 12 4.7 12 4.7s-7.2 0-9 .5a2.9 2.9 0 0 0-2 2C.5 9 .5 12 .5 12s0 3 .5 4.8a2.9 2.9 0 0 0 2 2c1.8.5 9 .5 9 .5s7.2 0 9-.5a2.9 2.9 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM9.7 15.1V8.9l6 3.1-6 3.1z"/>' },
  ];
  const contatoDoTema = document.querySelector('footer a.contact-link, footer a[href^="mailto:"]');
  if (!contatoDoTema) return;
  const lista = contatoDoTema.closest("ul") || contatoDoTema.parentElement;

  const icones = document.createElement("div");
  icones.className = "mm-redes";
  const novaAba = href => href.startsWith("mailto:") ? "" : ' target="_blank" rel="noopener"';
  icones.innerHTML = LINKS.filter(l => !l.oculto).map(l => `<a class="mm-rede" href="${l.href}"${novaAba(l.href)} aria-label="${l.nome}" title="${l.nome}"><svg viewBox="0 0 24 24" aria-hidden="true">${l.svg}</svg></a>`).join("");

  const email = document.createElement("a"); email.className = "mm-rede-mail"; email.href = "mailto:" + EMAIL; email.textContent = EMAIL;
  lista.replaceWith(icones); icones.insertAdjacentElement("afterend", email);
})();

} catch (e) { console.warn("mm redes.js", e); }

/* ===== rodape.js ===== */
try {
/* Rodapé com arte: textura de tijolos de masmorra, o baú feliz à esquerda com um balão e o baú cavaleiro
   à direita. No celular fica só o baú feliz, centralizado em cima.
   Imagens em assets/rodape/ (geradas por banners/faz_rodape.py); estilo em src/css/rodape.css. */
(function () {
  const rodape = document.querySelector("footer");
  if (!rodape || rodape.querySelector(".mm-rodape-arte")) return;

  rodape.classList.add("mm-rodape");
  rodape.style.setProperty("--mm-textura", `url("${MM.asset("rodape/masmorra.png")}")`);

  const arte = document.createElement("div");
  arte.className = "mm-rodape-arte";
  arte.setAttribute("aria-hidden", "true");
  arte.innerHTML = `
    <div class="mm-rodape-esq"><span class="mm-balao">Valeu pela visita!</span><img src="${MM.asset("rodape/feliz.webp")}" alt="" loading="lazy" width="244" height="220"></div>
    <div class="mm-rodape-dir"><img src="${MM.asset("rodape/cavaleiro.webp")}" alt="" loading="lazy" width="238" height="220"></div>`;
  rodape.prepend(arte);
})();

} catch (e) { console.warn("mm rodape.js", e); }

/* ===== venda.js ===== */
try {
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

} catch (e) { console.warn("mm venda.js", e); }

/* ===== seo.js ===== */
try {
/* SEO da loja real: só o que a Nuvemshop NÃO entrega.
   O tema já injeta, por script, Organization, WebPage com BreadcrumbList e Product com Offer
   (conferido em 06/10/2026 na página de produto). Repetir isso confundiria o Google, então aqui vai apenas:
   - WebSite na home, com o nome da loja (o Google usa para mostrar o nome do site no resultado;
     a caixa de busca do resultado, que usava SearchAction, foi aposentada pelo Google em 2024)
   - título e descrição de reserva para a home e para as páginas institucionais, caso o servidor
     mande o texto genérico ou vazio (o valor definitivo fica nos campos de SEO do admin).
   A home não tem campo de título no admin: com "Utilizar o nome e a descrição do negócio para o SEO"
   marcado, o servidor manda só o nome da loja, e o título completo entra por aqui. */
(function () {
  const LOJA = "https://mrmimic.com.br";
  const NOME = "Mr. Mimic";
  const path = location.pathname;

  // Título do servidor que ainda é o padrão da Nuvemshop, e o que vai no lugar.
  const TITULOS = {
    "/": { padrao: /^(Loja online de .*|Mr\. Mimic)$/, novo: NOME + " | Cartas Pokémon avulsas, selados e acessórios TCG" },
    "/contato/": { padrao: /^Contato - /, novo: "Contato | Mr. Mimic TCG & Colecionáveis" },
    "/produtos/": { padrao: /^Compre online produtos de/, novo: "Todos os Produtos | Cartas Pokémon, Selados e Acessórios | Mr. Mimic" }
  };
  const DESCRICOES = {
    "/": "Loja de Pokémon TCG: cartas avulsas NM em português, booster box e blisters lacrados, sleeves, toploaders e pastas BRA. Compramos sua coleção.",
    "/produtos/": "Todos os produtos da Mr. Mimic: cartas Pokémon avulsas NM, booster box e blisters lacrados em português, sleeves, toploaders, cases e pastas BRA.",
    "/contato/": "Fale com a Mr. Mimic pelo WhatsApp, pelo Instagram @mrmimicbr ou pelo e-mail contato@mrmimic.com.br. Cartas Pokémon TCG, selados e acessórios.",
    "/venda-suas-cartas/": "Compramos sua coleção de cartas Pokémon: de 1 carta à coleção inteira, avaliação carta a carta e pagamento no Pix. Também compramos games, consoles e figures.",
    "/envio-e-entrega/": "Prazos e formas de envio da Mr. Mimic: postagem em até 1 dia útil após o pagamento, Correios e transportadoras, embalagem reforçada para cartas e lacrados.",
    "/trocas-e-devolucoes/": "Política de trocas e devoluções da Mr. Mimic, conforme o Código de Defesa do Consumidor: desistência em 7 dias, produto com defeito, cartas e lacrados.",
    "/politica-de-privacidade/": "Como a Mr. Mimic TCG & Colecionáveis trata seus dados pessoais, de acordo com a LGPD: o que coletamos, para que usamos e como pedir exclusão."
  };

  // Troca a descrição quando ela falta, é a genérica da Nuvemshop ou é a da home repetida em outra página.
  function garanteDescricao(txt, chave) {
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    const generica = /^Compre produtos de|^Compre online/.test(m.content);
    const copiaDaHome = chave !== "/" && m.content === DESCRICOES["/"];
    if (!m.content || generica || copiaDaHome) m.content = txt;
  }

  function emite(dados) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(dados);
    document.head.appendChild(s);
  }

  function garanteTitulo(regra) {
    if (regra.padrao.test(document.title.trim())) document.title = regra.novo;
  }

  const chave = path === "" ? "/" : path;
  if (TITULOS[chave]) garanteTitulo(TITULOS[chave]);
  if (DESCRICOES[chave]) garanteDescricao(DESCRICOES[chave], chave);

  if (chave === "/") {
    emite({
      "@context": "https://schema.org", "@type": "WebSite",
      name: NOME, alternateName: "Mr. Mimic TCG & Colecionáveis", url: LOJA + "/", inLanguage: "pt-BR"
    });
  }
})();

} catch (e) { console.warn("mm seo.js", e); }
