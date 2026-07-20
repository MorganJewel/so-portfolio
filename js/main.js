import { loadPartials } from './include.js';
import { initNav } from './nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();
  initNav();
  document.dispatchEvent(new CustomEvent('app:ready'));
});
