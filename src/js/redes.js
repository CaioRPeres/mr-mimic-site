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
