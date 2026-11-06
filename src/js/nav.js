/* Menu do computador por categoria (06/11/2026). Pedido do Caio ("colecionáveis é uma categoria, assim como as
   outras que você colocou num link mega discreto") e boa prática da Baymard: as categorias à vista na barra, todas com
   o mesmo peso, em vez de tudo escondido atrás de "Produtos". A barra é montada a partir do submenu "Produtos" que a
   Nuvemshop entrega, então a estrutura continua sendo editada no admin (Loja online › Menus). Cada categoria com
   subcategoria ganha a sua caixinha ao passar o mouse. "Início" sai da barra: o logo já leva para a home.
   Estilo no fim do tema.css (.mm-nav-*). O menu do celular (gaveta) não muda. */
(function () {
  const lista = document.querySelector(".head-main .nav-desktop-list");
  if (!lista || lista.querySelector(".mm-nav-cat")) return;
  const produtos = [...lista.children].find(li => li.querySelector(".desktop-list-subitems"));
  if (!produtos) return;

  // só o texto do menu; o endereço da categoria não muda
  const ROTULO = { "Pokémon TCG": "Selados" };
  const caminho = href => { try { return new URL(href, location.origin).pathname; } catch (e) { return ""; } };
  const aqui = location.pathname;

  const novos = [...produtos.querySelector(".desktop-list-subitems").children].map(cat => {
    const a = cat.querySelector("a");
    if (!a) return null;
    const li = document.createElement("li");
    li.className = "mm-nav-cat js-desktop-nav-item nav-item-desktop nav-main-item";
    const link = document.createElement("a");
    link.className = "nav-list-link mm-nav-link";
    link.href = a.getAttribute("href");
    const nome = a.textContent.trim();
    link.textContent = ROTULO[nome] || nome;
    li.appendChild(link);

    // só os links da lista da própria categoria (a lista de fora também tem a classe list-subitems)
    const ul = cat.querySelector(":scope > ul");
    const subs = ul ? [...ul.querySelectorAll(":scope > li a")] : [];
    if (subs.length) {
      li.classList.add("mm-nav-com-sub");
      const caixa = document.createElement("div");
      caixa.className = "mm-nav-drop";
      subs.forEach(s => {
        const x = document.createElement("a");
        x.href = s.getAttribute("href");
        x.textContent = s.textContent.trim();
        caixa.appendChild(x);
      });
      li.appendChild(caixa);
    }
    // onde o cliente está: a categoria (ou uma subcategoria dela) é a página atual
    if ([link.href, ...subs.map(s => s.href)].map(caminho).some(p => p && p !== "/" && aqui.startsWith(p))) li.classList.add("mm-nav-aqui");
    return li;
  }).filter(Boolean);

  novos.forEach(li => lista.insertBefore(li, produtos));
  produtos.classList.add("mm-nav-oculto");
  const inicio = [...lista.children].find(li => /^\s*In[ií]cio\s*$/.test((li.querySelector("a") || {}).textContent || ""));
  if (inicio) inicio.classList.add("mm-nav-oculto");
})();
