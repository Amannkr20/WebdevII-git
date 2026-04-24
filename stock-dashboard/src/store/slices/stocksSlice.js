import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStockFull } from '../../utils/finnhub';

// The 12 symbols we track
export const TRACKED_SYMBOLS = [
  'AAPL','MSFT','GOOGL','AMZN','TSLA','META','NVDA','NFLX','JPM','V','JNJ','DIS'
];

// ── Fallback mock data shown when no API key is configured ──
const MOCK_STOCKS = [
  { symbol:'AAPL', name:'Apple Inc.',        sector:'Technology',    logo:'', marketCap:'$2.94T', price:189.30, change:2.45,  changePercent:1.31,  high:191.05, low:186.20, open:186.80, prevClose:186.85 },
  { symbol:'MSFT', name:'Microsoft Corp.',   sector:'Technology',    logo:'', marketCap:'$3.08T', price:415.32, change:5.67,  changePercent:1.38,  high:417.90, low:409.60, open:410.20, prevClose:409.65 },
  { symbol:'GOOGL',name:'Alphabet Inc.',     sector:'Technology',    logo:'', marketCap:'$2.19T', price:175.98, change:-1.12, changePercent:-0.63, high:178.40, low:174.55, open:177.30, prevClose:177.10 },
  { symbol:'AMZN', name:'Amazon.com Inc.',   sector:'E-Commerce',    logo:'', marketCap:'$1.93T', price:185.07, change:3.21,  changePercent:1.77,  high:186.50, low:181.80, open:182.10, prevClose:181.86 },
  { symbol:'TSLA', name:'Tesla Inc.',        sector:'Automotive',    logo:'', marketCap:'$565B',  price:177.58, change:-5.43, changePercent:-2.97, high:183.40, low:176.10, open:182.90, prevClose:183.01 },
  { symbol:'META', name:'Meta Platforms',    sector:'Technology',    logo:'', marketCap:'$1.35T', price:527.19, change:8.91,  changePercent:1.72,  high:529.80, low:518.30, open:519.10, prevClose:518.28 },
  { symbol:'NVDA', name:'NVIDIA Corp.',      sector:'Semiconductors',logo:'', marketCap:'$2.16T', price:875.39, change:22.14, changePercent:2.60,  high:880.20, low:853.60, open:854.10, prevClose:853.25 },
  { symbol:'NFLX', name:'Netflix Inc.',      sector:'Entertainment', logo:'', marketCap:'$270B',  price:628.14, change:-3.77, changePercent:-0.60, high:633.90, low:625.40, open:632.00, prevClose:631.91 },
  { symbol:'JPM',  name:'JPMorgan Chase',    sector:'Finance',       logo:'', marketCap:'$571B',  price:198.47, change:1.23,  changePercent:0.62,  high:199.80, low:196.90, open:197.30, prevClose:197.24 },
  { symbol:'V',    name:'Visa Inc.',         sector:'Finance',       logo:'', marketCap:'$579B',  price:279.45, change:2.10,  changePercent:0.76,  high:280.90, low:277.10, open:277.50, prevClose:277.35 },
  { symbol:'JNJ',  name:'Johnson & Johnson', sector:'Healthcare',    logo:'', marketCap:'$354B',  price:147.56, change:-0.87, changePercent:-0.59, high:149.20, low:147.10, open:148.40, prevClose:148.43 },
  { symbol:'DIS',  name:'Walt Disney Co.',   sector:'Entertainment', logo:'', marketCap:'$205B',  price:112.34, change:-1.56, changePercent:-1.37, high:114.20, low:111.80, open:113.80, prevClose:113.90 },
];

const hasApiKey = () => {
  const key = import.meta.env.VITE_FINNHUB_KEY;
  return key && key !== 'your_key_here' && key.trim().length > 8;
};

// Fetch all stocks — uses real Finnhub API if key is set, otherwise mock data
export const fetchAllStocks = createAsyncThunk(
  'stocks/fetchAll',
  async (_, { rejectWithValue }) => {
    // No API key → return mock data instantly so UI is always usable
    if (!hasApiKey()) {
      await new Promise(r => setTimeout(r, 600)); // simulate brief loading
      return MOCK_STOCKS.map(s => ({
        ...s,
        price: parseFloat((s.price * (1 + (Math.random() - 0.5) * 0.004)).toFixed(2)),
      }));
    }
    try {
      // Stagger requests to respect 60/min rate limit
      const results = [];
      for (let i = 0; i < TRACKED_SYMBOLS.length; i++) {
        const data = await fetchStockFull(TRACKED_SYMBOLS[i]);
        results.push(data);
        if (i < TRACKED_SYMBOLS.length - 1) {
          await new Promise(r => setTimeout(r, 120));
        }
      }
      return results;
    } catch (err) {
      // API failed → fall back to mock so app stays usable
      console.warn('Finnhub API error, falling back to mock data:', err.message);
      return MOCK_STOCKS;
    }
  }
);

// Refresh a single stock (used by alert checker)
export const refreshSingleStock = createAsyncThunk(
  'stocks/refreshOne',
  async (symbol, { rejectWithValue }) => {
    try {
      return await fetchStockFull(symbol);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const SECTORS = ['All','Technology','Finance','Healthcare','Automotive','Entertainment','Semiconductors','E-Commerce'];

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: {
    list: [],
    status: 'idle',   // idle | loading | succeeded | failed
    error: null,
    lastUpdated: null,
    searchQuery: '',
    selectedSector: 'All',
    sortBy: 'symbol',
    sortOrder: 'asc',
    currentPage: 1,
    itemsPerPage: 8,
  },
  reducers: {
    setSearchQuery:    (s, a) => { s.searchQuery    = a.payload; s.currentPage = 1; },
    setSelectedSector: (s, a) => { s.selectedSector = a.payload; s.currentPage = 1; },
    setCurrentPage:    (s, a) => { s.currentPage    = a.payload; },
    toggleSort: (s, a) => {
      if (s.sortBy === a.payload) s.sortOrder = s.sortOrder === 'asc' ? 'desc' : 'asc';
      else { s.sortBy = a.payload; s.sortOrder = 'asc'; }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllStocks.pending,  s => { s.status = 'loading'; s.error = null; })
      .addCase(fetchAllStocks.fulfilled,(s, a) => {
        s.status = 'succeeded';
        s.list   = a.payload;
        s.lastUpdated = new Date().toLocaleTimeString();
      })
      .addCase(fetchAllStocks.rejected, (s, a) => {
        s.status = 'failed';
        s.error  = a.payload;
      })
      .addCase(refreshSingleStock.fulfilled, (s, a) => {
        const idx = s.list.findIndex(x => x.symbol === a.payload.symbol);
        if (idx !== -1) s.list[idx] = a.payload;
      });
  },
});

export const { setSearchQuery, setSelectedSector, setCurrentPage, toggleSort } = stocksSlice.actions;

// Memoised selector
export const selectFiltered = state => {
  const { list, searchQuery, selectedSector, sortBy, sortOrder } = state.stocks;
  let arr = [...list];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    arr = arr.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  }
  if (selectedSector !== 'All') arr = arr.filter(s => s.sector === selectedSector);
  arr.sort((a, b) => {
    let A = a[sortBy], B = b[sortBy];
    if (typeof A === 'string') A = A.toLowerCase();
    if (typeof B === 'string') B = B.toLowerCase();
    return sortOrder === 'asc' ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
  });
  return arr;
};

export { SECTORS };
export default stocksSlice.reducer;
