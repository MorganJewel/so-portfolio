import { fetchSheetRange } from '../sheets-api.js';

async function initAbout() {
  const rows = await fetchSheetRange('about');
}

document.addEventListener('app:ready', initAbout);
