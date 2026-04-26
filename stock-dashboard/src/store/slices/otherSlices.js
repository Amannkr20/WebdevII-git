import { createSlice } from '@reduxjs/toolkit';

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: { items: ['AAPL', 'NVDA', 'TSLA'] },
  reducers: {
    addToWatchlist:      (s, a) => { if (!s.items.includes(a.payload)) s.items.push(a.payload); },
    removeFromWatchlist: (s, a) => { s.items = s.items.filter(x => x !== a.payload); },
  },
});

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDark: true },
  reducers: { toggleTheme: s => { s.isDark = !s.isDark; } },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export const { toggleTheme } = themeSlice.actions;
