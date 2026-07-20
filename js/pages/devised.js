import { fetchSheetRange } from '../sheets-api.js';

async function initDevised() {
  const rows = await fetchSheetRange('devised');
}

document.addEventListener('app:ready', initDevised);
