import { loadPartials } from './include.js';
import { initNav } from './nav.js';
import { applySiteSettings } from './settings.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();
  initNav();
  await applySiteSettings();
  document.dispatchEvent(new CustomEvent('app:ready'));
});
