import { loadPartials } from './include.js';
import { initNav } from './nav.js';
import { applySiteSettings } from './settings.js';
import { initScrapbookReveal } from './scrapbook-reveal.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();
  initNav();
  await applySiteSettings();
  initScrapbookReveal();
  document.dispatchEvent(new CustomEvent('app:ready'));
});
