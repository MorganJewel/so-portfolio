import { fetchSheetRange } from '../sheets-api.js';

async function initPress() {
  const rows = await fetchSheetRange('press');
}

document.addEventListener('app:ready', initPress);
