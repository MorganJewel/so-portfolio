import { fetchSheetRange } from '../sheets-api.js';

async function initWriting() {
  const rows = await fetchSheetRange('writing');
}

document.addEventListener('app:ready', initWriting);
