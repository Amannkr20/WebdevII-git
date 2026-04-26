import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert, clearTriggered, clearHistory, setPermission } from '../store/slices/alertsSlice';
import { requestNotificationPermission } from '../utils/notifications';
import AddAlertModal from '../components/Alerts/AddAlertModal';
import { Bell, BellOff, Plus, Trash2, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

export default function Alerts() {
  const dispatch    = useDispatch();
  const alerts      = useSelector(s => s.alerts.items);
  const history     = useSelector(s => s.alerts.history);
  const permission  = useSelector(s => s.alerts.permission);
  const stocks      = useSelector(s => s.stocks.list);
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState('active');

  const active    = alerts.filter(a => !a.triggered);
  const triggered = alerts.filter(a => a.triggered);

  const handleEnableNotifs = async () => {
    const result = await requestNotificationPermission();
    dispatch(setPermission(result));
  };

  const stockPrice = symbol => stocks.find(s => s.symbol === symbol)?.price;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between fu">
        <div>
          <h1 className="text-2xl font-bold" style={{ color:'var(--text-primary)' }}>Price Alerts</h1>
          <p className="text-sm mt-0.5" style={{ color:'var(--text-muted)' }}>
            Get browser notifications when stocks hit your targets
          </p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background:'var(--accent)', color:'#000' }}>
          <Plus size={15}/> New Alert
        </button>
      </div>

      {/* Notification permission banner */}
      {permission !== 'granted' && (
        <div className="rounded-2xl p-4 flex items-center justify-between gap-4 fu1"
          style={{ background:'var(--yellow-dim)', border:'1px solid var(--yellow)' }}>
          <div className="flex items-center gap-3">
            {permission === 'denied'
              ? <BellOff size={18} style={{ color:'var(--yellow)' }}/>
              : <Bell size={18} style={{ color:'var(--yellow)' }}/>
            }
            <div>
              <p className="text-sm font-bold" style={{ color:'var(--yellow)' }}>
                {permission === 'denied' ? 'Notifications blocked' : 'Enable notifications'}
              </p>
              <p className="text-xs" style={{ color:'var(--text-muted)' }}>
                {permission === 'denied'
                  ? 'Allow notifications in browser settings to receive alerts.'
                  : 'Allow browser notifications to get real-time price alerts.'
                }
              </p>
            </div>
          </div>
          {permission !== 'denied' && (
            <button onClick={handleEnableNotifs}
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background:'var(--yellow)', color:'#000' }}>
              Enable
            </button>
          )}
        </div>
      )}

      {permission === 'granted' && (
        <div className="rounded-xl px-4 py-2 flex items-center gap-2 fu1"
          style={{ background:'var(--accent-dim)', border:'1px solid var(--accent)' }}>
          <CheckCircle size={14} style={{ color:'var(--accent)' }}/>
          <p className="text-xs font-medium" style={{ color:'var(--accent)' }}>
            Notifications enabled — alerts are checked every 60 seconds
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl fu2" style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
        {[
          { key:'active',    label:`Active (${active.length})` },
          { key:'triggered', label:`Triggered (${triggered.length})` },
          { key:'history',   label:`History (${history.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
            style={{
              background: tab===t.key ? 'var(--accent-dim)' : 'transparent',
              color:      tab===t.key ? 'var(--accent)' : 'var(--text-muted)',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Active alerts */}
      {tab === 'active' && (
        <div className="space-y-3 fu">
          {active.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <Bell size={32} style={{ color:'var(--text-muted)' }}/>
              <p className="font-bold" style={{ color:'var(--text-primary)' }}>No active alerts</p>
              <p className="text-sm" style={{ color:'var(--text-muted)' }}>Tap "New Alert" to set your first price target.</p>
            </div>
          ) : active.map(alert => {
            const current = stockPrice(alert.symbol);
            const diff    = current ? ((current - alert.targetPrice) / alert.targetPrice * 100).toFixed(1) : null;
            const isAbove = alert.type === 'above';
            return (
              <div key={alert.id} className="rounded-2xl p-4 border flex items-center gap-4"
                style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: isAbove ? 'var(--accent-dim)' : 'var(--red-dim)' }}>
                  {isAbove ? <TrendingUp size={16} style={{color:'var(--accent)'}}/> : <TrendingDown size={16} style={{color:'var(--red)'}}/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color:'var(--text-primary)' }}>{alert.symbol}</span>
                    <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: isAbove?'var(--accent-dim)':'var(--red-dim)', color: isAbove?'var(--accent)':'var(--red)' }}>
                      {isAbove ? '▲ above' : '▼ below'} ${alert.targetPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs mt-0.5 flex items-center gap-3" style={{ color:'var(--text-muted)' }}>
                    <span>Current: <span className="font-mono" style={{color:'var(--text-primary)'}}>${current?.toFixed(2) ?? '—'}</span></span>
                    {diff && <span style={{ color: Math.abs(parseFloat(diff)) < 5 ? 'var(--yellow)' : 'var(--text-muted)' }}>
                      {parseFloat(diff) > 0 ? '+' : ''}{diff}% from target
                    </span>}
                    <span className="flex items-center gap-0.5"><Clock size={10}/> {new Date(alert.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button onClick={() => dispatch(removeAlert(alert.id))}
                  className="p-2 rounded-lg transition-all shrink-0"
                  style={{ color:'var(--text-muted)', background:'var(--border)' }}>
                  <Trash2 size={13}/>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Triggered alerts */}
      {tab === 'triggered' && (
        <div className="space-y-3 fu">
          {triggered.length > 0 && (
            <div className="flex justify-end">
              <button onClick={() => dispatch(clearTriggered())}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{ background:'var(--red-dim)', color:'var(--red)', border:'1px solid var(--red)' }}>
                Clear all
              </button>
            </div>
          )}
          {triggered.length === 0
            ? <div className="py-20 text-center"><p style={{color:'var(--text-muted)'}}>No triggered alerts yet.</p></div>
            : triggered.map(alert => (
              <div key={alert.id} className="rounded-2xl p-4 border flex items-center gap-4"
                style={{ background:'var(--bg-card)', borderColor:'var(--accent)', opacity:0.7 }}>
                <CheckCircle size={20} style={{ color:'var(--accent)', shrink:0 }}/>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color:'var(--text-primary)' }}>
                    {alert.symbol} hit ${alert.targetPrice} target
                  </p>
                  <p className="text-xs" style={{ color:'var(--text-muted)' }}>
                    Fired at ${alert.triggeredPrice?.toFixed(2)} · {new Date(alert.triggeredAt).toLocaleString()}
                  </p>
                </div>
                <button onClick={() => dispatch(removeAlert(alert.id))} className="p-2 rounded-lg" style={{ color:'var(--text-muted)', background:'var(--border)' }}>
                  <Trash2 size={13}/>
                </button>
              </div>
            ))
          }
        </div>
      )}

      {/* History */}
      {tab === 'history' && (
        <div className="space-y-3 fu">
          {history.length > 0 && (
            <div className="flex justify-end">
              <button onClick={() => dispatch(clearHistory())}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background:'var(--red-dim)', color:'var(--red)', border:'1px solid var(--red)' }}>
                Clear history
              </button>
            </div>
          )}
          {history.length === 0
            ? <div className="py-20 text-center"><p style={{color:'var(--text-muted)'}}>Alert history is empty.</p></div>
            : history.map(a => (
              <div key={a.id + a.triggeredAt} className="rounded-xl px-4 py-3 border flex items-center justify-between text-xs"
                style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
                <span className="font-bold" style={{color:'var(--text-primary)'}}>{a.symbol}</span>
                <span style={{color:'var(--text-muted)'}}>Target ${a.targetPrice} → Fired ${a.triggeredPrice?.toFixed(2)}</span>
                <span style={{color:'var(--text-muted)'}}>{new Date(a.triggeredAt).toLocaleString()}</span>
              </div>
            ))
          }
        </div>
      )}

      {showModal && <AddAlertModal onClose={() => setShowModal(false)}/>}
    </div>
  );
}
