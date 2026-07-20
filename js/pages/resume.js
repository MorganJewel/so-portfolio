import { fetchSheetRange } from '../sheets-api.js';

async function initResume() {
  const rows = await fetchSheetRange('resume');
}

document.addEventListener('app:ready', initResume);
