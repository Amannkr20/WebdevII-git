# 📈 StockPulse — Live Alerts Dashboard

> **Project Statement:** A React-based real-time stock market dashboard that fetches live financial data using the Finnhub public API, featuring a browser notification-based price alert system where users set custom buy/sell thresholds — with Redux Toolkit state management, debounced search, dark mode, and paginated stock exploration.

---

## 🚀 Setup (3 steps)

```bash
# 1. Install
npm install

# 2. Add your FREE Finnhub API key
cp .env.example .env
# Edit .env → paste your key from https://finnhub.io/register

# 3. Run
npm run dev
```

Open http://localhost:5173

---

## 🔔 Unique Feature: Live Price Alert System

Users can set price thresholds (above/below) on any stock via a **3-step form**. The app checks prices against alerts every 60 seconds using the real Finnhub API, and fires **browser push notifications** when conditions are met. Alert history is tracked in Redux.

**Steps to test:**
1. Go to Alerts page → New Alert
2. Select a stock, set type (above/below), enter target price
3. Click "Enable" to allow browser notifications
4. Wait for the 60-second checker to fire

---

## ✅ Features

| Feature | Details |
|---|---|
| 🔔 Price Alerts + Browser Notifications | **Unique Advanced Feature** — 3-step form, real-time checker, history log |
| 🔍 Search + Filter + Sort | Debounced search, sector pills, sort by symbol/price/change% |
| 📄 Pagination | 8 stocks/page, page controls |
| 🌙 Dark Mode | Full CSS-variable based theming via Redux |
| ⚡ Debounced API calls | 380ms debounce on search input |
| 📊 Charts | Real Finnhub candle data — area chart + volume bars |
| ⚠️ Error Boundary | Class-based, wraps all page sections |
| ⚙️ Memoization | `React.memo` on StockCard, `useMemo` for selectors |
| 🔄 Lazy Loading | All pages via `React.lazy()` + `Suspense` |

---

## 🗂️ Structure

```
src/
├── components/
│   ├── Alerts/      AddAlertModal (3-step form with validation)
│   ├── Dashboard/   TopMovers, SectorChart
│   ├── Layout/      Navbar
│   ├── Stock/       StockCard, StockChart, SearchFilterBar
│   └── UI/          ErrorBoundary, Pagination, StatCard
├── hooks/
│   ├── useDebounce.js       debounced search
│   └── useAlertChecker.js   60s alert polling + notification dispatch
├── pages/
│   ├── Dashboard.jsx
│   ├── Market.jsx
│   ├── Watchlist.jsx
│   ├── Alerts.jsx           ← unique feature page
│   └── StockDetail.jsx
├── store/slices/
│   ├── stocksSlice.js       async thunk → real Finnhub API
│   ├── alertsSlice.js       alert CRUD + history
│   └── otherSlices.js       watchlist + theme
└── utils/
    ├── finnhub.js            all Fetch API calls
    └── notifications.js      Browser Notification API wrapper
```

---

## 🌐 Real API Used

**Finnhub** — https://finnhub.io  
Free tier: 60 requests/minute, no credit card required.

Endpoints used:
- `/quote` — real-time price, change, high/low
- `/stock/profile2` — company name, logo, sector, market cap
- `/stock/candle` — OHLCV data for price charts
- `/news` — market news

---

## 🚢 Deploy to Vercel

```bash
npm run build
# Push to GitHub → import at vercel.com → add env var VITE_FINNHUB_KEY
```
