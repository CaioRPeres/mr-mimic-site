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
    "/contato/": "Fale com a Mr. Mimic pelo e-mail contato@mrmimic.com.br, pelo Instagram @mrmimicbr ou pelo formulário. Cartas Pokémon TCG, selados e acessórios.",
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
