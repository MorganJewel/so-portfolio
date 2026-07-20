import { fetchSheetRange } from '../sheets-api.js';

async function initHome() {
  const rows = await fetchSheetRange('home');
}

document.addEventListener('app:ready', initHome);
