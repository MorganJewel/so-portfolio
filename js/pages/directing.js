import { fetchSheetRange } from '../sheets-api.js';

async function initDirecting() {
  const rows = await fetchSheetRange('directing');
}

document.addEventListener('app:ready', initDirecting);
