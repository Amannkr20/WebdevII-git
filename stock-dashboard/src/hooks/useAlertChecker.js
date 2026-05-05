import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markTriggered } from '../store/slices/alertsSlice';
import { refreshSingleStock } from '../store/slices/stocksSlice';
import { checkAlertsAgainstPrice } from '../utils/notifications';

// Runs every 60s, checks all active alerts against live prices
export function useAlertChecker(intervalMs = 60000) {
  const dispatch  = useDispatch();
  const alerts    = useSelector(s => s.alerts.items);
  const stocks    = useSelector(s => s.stocks.list);
  const permission = useSelector(s => s.alerts.permission);
  const ref       = useRef(null);

  useEffect(() => {
    if (permission !== 'granted') return;

    const check = async () => {
      // Get unique symbols that have active (non-triggered) alerts
      const activeSymbols = [...new Set(
        alerts.filter(a => !a.triggered).map(a => a.symbol)
      )];

      for (const symbol of activeSymbols) {
        // Refresh price from real API
        const result = await dispatch(refreshSingleStock(symbol)).unwrap().catch(() => null);
        const stock = result || stocks.find(s => s.symbol === symbol);
        if (!stock || !stock.price) continue;

        const triggered = checkAlertsAgainstPrice(alerts, symbol, stock.price);
        triggered.forEach(alert => {
          dispatch(markTriggered( { id: alert.id, triggeredPrice: stock.price }));
        });
      }
    };

    check(); // immediate first check
    ref.current = setInterval(check, intervalMs);
    return () => clearInterval(ref.current);
  }, [alerts, permission, intervalMs]);
}
