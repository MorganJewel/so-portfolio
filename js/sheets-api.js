import { SHEETS_CONFIG } from './config.js';

const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

export async function fetchSheetRange(rangeKey) {
  const { spreadsheetId, apiKey, ranges } = SHEETS_CONFIG;
  const range = ranges[rangeKey];

  if (!spreadsheetId || !apiKey || !range) {
    console.warn(`Sheets config incomplete for "${rangeKey}" — skipping fetch.`);
    return [];
  }

  const url = `${BASE_URL}/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Sheets API request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.values ?? [];
}
