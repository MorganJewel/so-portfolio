import { fetchSheetRange } from '../sheets-api.js';

async function initShow() {
  const showId = document.body.dataset.showId;
  const rows = await fetchSheetRange('shows');
  const showRows = rows.filter((row) => row[0] === showId);
}

document.addEventListener('app:ready', initShow);
