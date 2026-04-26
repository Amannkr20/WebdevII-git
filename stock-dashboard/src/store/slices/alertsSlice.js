import { createSlice } from '@reduxjs/toolkit';

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    items: [],         // { id, symbol, type:'above'|'below', targetPrice, createdAt, triggered, triggeredAt, triggeredPrice }
    permission: 'default',  // 'default' | 'granted' | 'denied' | 'unsupported'
    history: [],       // fired alerts log
  },
  reducers: {
    setPermission: (s, a) => { s.permission = a.payload; },

    addAlert: (s, a) => {
      s.items.push({
        id: Date.now().toString(),
        symbol:      a.payload.symbol,
        type:        a.payload.type,        // 'above' | 'below'
        targetPrice: parseFloat(a.payload.targetPrice),
        createdAt:   new Date().toISOString(),
        triggered:   false,
        triggeredAt: null,
        triggeredPrice: null,
      });
    },

    removeAlert: (s, a) => {
      s.items = s.items.filter(x => x.id !== a.payload);
    },

    markTriggered: (s, a) => {
      // a.payload = { id, triggeredPrice }
      const alert = s.items.find(x => x.id === a.payload.id);
      if (!alert) return;
      alert.triggered      = true;
      alert.triggeredAt    = new Date().toISOString();
      alert.triggeredPrice = a.payload.triggeredPrice;
      // move to history
      s.history.unshift({ ...alert });
    },

    clearTriggered: s => { s.items = s.items.filter(x => !x.triggered); },
    clearHistory:   s => { s.history = []; },
  },
});

export const { setPermission, addAlert, removeAlert, markTriggered, clearTriggered, clearHistory } = alertsSlice.actions;
export default alertsSlice.reducer;
