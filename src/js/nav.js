/* Menu do computador por categoria (06/11/2026). Pedido do Caio ("colecionáveis é uma categoria, assim como as
   outras que você colocou num link mega discreto") e boa prática da Baymard: as categorias à vista na barra, todas com
   o mesmo peso, em vez de tudo escondido atrás de "Produtos". A barra é montada a partir do submenu "Produtos" que a
   Nuvemshop entrega, então a estrutura continua sendo editada no admin (Loja online › Menus). Cada categoria com
   subcategoria ganha a sua caixinha ao passar o mouse. "Início" sai da barra: o logo já leva para a home.
   Estilo no fim do tema.css (.mm-nav-*). Na gaveta do celular só muda a ordem das subcategorias (por estoque). */
(function () {
  const caminho = href => { try { return new URL(href, location.origin).pathname; } catch (e) { return ""; } };
  // 06/11/2026 (Caio: "as coleções que têm mais cartas têm que estar no topo do menu... o cara olha um link, olha o
  // segundo, não vê nada, ele não vê o terceiro"): subcategorias em ordem de produtos com estoque, e as que estão com
  // zero saem do menu. A contagem vem de menu_contagem.py (MM.menu); subcategoria sem contagem fica no fim.
  const contagem = (MM.menu && MM.menu.categorias) || {};
  const estoque = href => { const c = contagem[caminho(href)]; return c ? c.estoque : -1; };
  MM.ordenarSubs = links => links
    .map((a, i) => ({ a, i, n: estoque(a.getAttribute("href") || a.href) }))
    .filter(x => x.n !== 0)
    .sort((x, y) => (y.n - x.n) || (x.i - y.i))
    .map(x => x.a);
  // menu do celular (gaveta): mesma ordem por estoque nas subcategorias, e as vazias saem; "Ver tudo em ..." fica em cima
  const ordenarGaveta = () => {
    if (!MM.ordenarSubs) return;
    document.querySelectorAll(".modal-nav-hamburger ul, .modal-nav-hamburger .modal-body").forEach(ul => {
      const itens = [...ul.children].filter(li => li.tagName === "LI");
      // só subcategoria (/categoria/sub/); categoria de primeiro nível nunca sai da gaveta
      const sub = a => caminho(a.getAttribute("href") || "").split("/").filter(Boolean).length >= 2;
      const folhas = itens.filter(li => { const a = li.querySelector(":scope > a"); return a && !/^\s*Ver tud/i.test(a.textContent) && sub(a); });
      if (folhas.length < 2) return;
      const ordem = MM.ordenarSubs(folhas.map(li => li.querySelector(":scope > a")));
      folhas.forEach(li => { if (!ordem.includes(li.querySelector(":scope > a"))) li.remove(); });
      ordem.forEach(a => ul.appendChild(a.parentElement));
    });
  };
  setTimeout(ordenarGaveta, 0);
})();
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
    const subs = ul ? MM.ordenarSubs([...ul.querySelectorAll(":scope > li a")]) : [];
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
