async function loadPartial(el) {
  const src = el.getAttribute('data-include');
  const root = window.SITE_ROOT ?? './';
  const res = await fetch(`${root}${src}`);
  const html = await res.text();
  el.innerHTML = html.replaceAll('{{ROOT}}', root);
}

export async function loadPartials() {
  const targets = document.querySelectorAll('[data-include]');
  await Promise.all([...targets].map(loadPartial));
  document.dispatchEvent(new CustomEvent('partials:loaded'));
}
