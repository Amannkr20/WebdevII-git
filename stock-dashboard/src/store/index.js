import { configureStore } from '@reduxjs/toolkit';
import stocksReducer  from './slices/stocksSlice';
import alertsReducer  from './slices/alertsSlice';
import { watchlistSlice, themeSlice } from './slices/otherSlices';

export const store = configureStore({
  reducer: {
    stocks:    stocksReducer,
    alerts:    alertsReducer,
    watchlist: watchlistSlice.reducer,
    theme:     themeSlice.reducer,
  },
});
