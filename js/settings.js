import { fetchSheetRange } from './sheets-api.js';

export async function applySiteSettings() {
  const rows = await fetchSheetRange('settings');
  const settings = Object.fromEntries(rows.map(([key, value]) => [key, value]));

  const emailLink = document.getElementById('footerEmail');
  if (emailLink && settings.footer_email) {
    emailLink.href = `mailto:${settings.footer_email}`;
    emailLink.textContent = settings.footer_email;
  }
}
