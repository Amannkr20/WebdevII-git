// ─────────────────────────────────────────────
//  Finnhub API  •  https://finnhub.io
//  Free tier: 60 requests / minute
//  Get your free key at https://finnhub.io/register
// ─────────────────────────────────────────────

const BASE = 'https://finnhub.io/api/v1';

// READ YOUR KEY from .env  →  VITE_FINNHUB_KEY=your_key_here
// For quick testing you can also paste your key directly below:
const KEY = import.meta.env.VITE_FINNHUB_KEY || 'YOUR_API_KEY_HERE';

async function get(path, params = {}) {
  const url = new URL(BASE + path);
  url.searchParams.set('token', KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Finnhub ${res.status}: ${res.statusText}`);
  return res.json();
}

// Real-time quote  { c: current, d: change, dp: changePercent, h, l, o, pc }
export async function fetchQuote(symbol) {
  return get('/quote', { symbol });
}

// Company profile  { name, ticker, logo, finnhubIndustry, marketCapitalization }
export async function fetchProfile(symbol) {
  return get('/stock/profile2', { symbol });
}

// Batch: quote + profile for a symbol
export async function fetchStockFull(symbol) {
  const [quote, profile] = await Promise.all([fetchQuote(symbol), fetchProfile(symbol)]);
  return {
    symbol,
    name:          profile.name        || symbol,
    sector:        profile.finnhubIndustry || 'Unknown',
    logo:          profile.logo        || '',
    marketCap:     profile.marketCapitalization
                     ? `$${(profile.marketCapitalization / 1000).toFixed(1)}B`
                     : '—',
    price:         quote.c,
    change:        quote.d,
    changePercent: quote.dp,
    high:          quote.h,
    low:           quote.l,
    open:          quote.o,
    prevClose:     quote.pc,
  };
}

// Market news
export async function fetchMarketNews(category = 'general') {
  return get('/news', { category });
}

// Candle data for chart  (resolution: D = daily)
export async function fetchCandles(symbol, resolution = 'D', from, to) {
  return get('/stock/candle', { symbol, resolution, from, to });
}
