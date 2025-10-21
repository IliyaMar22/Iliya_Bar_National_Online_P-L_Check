// Currency conversion utilities

// Official EUR/BGN fixed exchange rate
const BGN_TO_EUR_RATE = 1.95583;

/**
 * Convert BGN to EUR
 * @param {number} bgn - Amount in Bulgarian Lev
 * @returns {number} - Amount in Euros (rounded to 2 decimals)
 */
export function bgnToEur(bgn) {
  return Math.round((bgn / BGN_TO_EUR_RATE) * 100) / 100;
}

/**
 * Format amount in BGN with EUR equivalent
 * @param {number} bgn - Amount in Bulgarian Lev
 * @returns {string} - Formatted string: "BGN 100.00 (€51.13)"
 */
export function formatCurrency(bgn) {
  const eur = bgnToEur(bgn);
  // Display BGN as entered (without forcing decimals), but EUR with 2 decimals
  const bgnFormatted = Number.isInteger(bgn) ? bgn.toString() : bgn.toFixed(2);
  return `BGN ${bgnFormatted} (€${eur.toFixed(2)})`;
}

/**
 * Format amount in BGN only
 * @param {number} bgn - Amount in Bulgarian Lev
 * @returns {string} - Formatted string: "BGN 100.00"
 */
export function formatBGN(bgn) {
  return `BGN ${bgn.toFixed(2)}`;
}

/**
 * Format amount in EUR only
 * @param {number} bgn - Amount in Bulgarian Lev (will be converted)
 * @returns {string} - Formatted string: "€51.13"
 */
export function formatEUR(bgn) {
  const eur = bgnToEur(bgn);
  return `€${eur.toFixed(2)}`;
}

export const CONVERSION_RATE = BGN_TO_EUR_RATE;

