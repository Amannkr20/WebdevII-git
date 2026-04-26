// Browser Notification API wrapper
// Unique advanced feature: Price Alert Notifications

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  const result = await Notification.requestPermission();
  return result;
}

export function sendNotification(title, body, options = {}) {
  if (Notification.permission !== 'granted') return;
  const n = new Notification(title, {
    body,
    icon: '/vite.svg',
    badge: '/vite.svg',
    tag: options.tag || 'stockpulse-alert',
    ...options,
  });
  // Auto-close after 6 seconds
  setTimeout(() => n.close(), 6000);
  return n;
}

export function checkAlertsAgainstPrice(alerts, symbol, currentPrice) {
  const triggered = [];
  alerts.forEach(alert => {
    if (alert.symbol !== symbol || alert.triggered) return;
    if (alert.type === 'above' && currentPrice >= alert.targetPrice) {
      triggered.push({ ...alert, currentPrice });
      sendNotification(
        `🚀 ${symbol} crossed ₹${alert.targetPrice}`,
        `${symbol} is now at ₹${currentPrice.toFixed(2)} — above your alert of ₹${alert.targetPrice}`,
        { tag: `alert-${alert.id}` }
      );
    }
    if (alert.type === 'below' && currentPrice <= alert.targetPrice) {
      triggered.push({ ...alert, currentPrice });
      sendNotification(
        `🔻 ${symbol} dropped below ₹${alert.targetPrice}`,
        `${symbol} is now at ₹${currentPrice.toFixed(2)} — below your alert of ₹${alert.targetPrice}`,
        { tag: `alert-${alert.id}` }
      );
    }
  });
  return triggered;
}
