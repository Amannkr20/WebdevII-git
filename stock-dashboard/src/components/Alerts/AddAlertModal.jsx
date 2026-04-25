import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from '../../store/slices/alertsSlice';
import { X, Bell, ChevronRight, CheckCircle } from 'lucide-react';

export default function AddAlertModal({ onClose, defaultSymbol = '' }) {
  const dispatch = useDispatch();
  const stocks   = useSelector(s => s.stocks.list);
  const [step, setStep]   = useState(1); // 3-step form
  const [form, setForm]   = useState({ symbol: defaultSymbol, type: 'above', targetPrice: '' });
  const [errors, setErrors] = useState({});

  const currentStock = stocks.find(s => s.symbol === form.symbol);

  // Step 1 validation
  const validateStep1 = () => {
    if (!form.symbol) return { symbol: 'Please select a stock' };
    return {};
  };
  // Step 2 validation
  const validateStep2 = () => {
    const errs = {};
    if (!form.targetPrice) errs.targetPrice = 'Enter a target price';
    else if (isNaN(form.targetPrice) || parseFloat(form.targetPrice) <= 0) errs.targetPrice = 'Must be a positive number';
    else if (
      form.type === 'above' && currentStock && parseFloat(form.targetPrice) <= currentStock.price
    ) errs.targetPrice = `Must be above current price $${currentStock.price?.toFixed(2)}`;
    else if (
      form.type === 'below' && currentStock && parseFloat(form.targetPrice) >= currentStock.price
    ) errs.targetPrice = `Must be below current price $${currentStock.price?.toFixed(2)}`;
    return errs;
  };

  const next = () => {
    if (step === 1) { const e = validateStep1(); if (Object.keys(e).length) { setErrors(e); return; } }
    if (step === 2) { const e = validateStep2(); if (Object.keys(e).length) { setErrors(e); return; } }
    setErrors({});
    setStep(s => s + 1);
  };

  const submit = () => {
    dispatch(addAlert(form));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)' }}>
      <div className="w-full max-w-md rounded-2xl p-6 si" style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell size={16} style={{ color:'var(--accent)' }} />
            <h2 className="text-base font-bold" style={{ color:'var(--text-primary)' }}>New Price Alert</h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background:'var(--border)', color:'var(--text-muted)' }}><X size={14}/></button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1,2,3].map(n => (
            <React.Fragment key={n}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{ background: step >= n ? 'var(--accent)' : 'var(--border)', color: step >= n ? '#000' : 'var(--text-muted)' }}>
                {step > n ? <CheckCircle size={14}/> : n}
              </div>
              {n < 3 && <div className="flex-1 h-0.5 rounded transition-all" style={{ background: step > n ? 'var(--accent)' : 'var(--border)' }}/>}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Choose stock */}
        {step === 1 && (
          <div className="space-y-3 fu">
            <label className="text-xs font-medium" style={{ color:'var(--text-muted)' }}>Select Stock</label>
            <select value={form.symbol} onChange={e => setForm(f=>({...f, symbol:e.target.value}))}
              className="w-full px-3 py-3 rounded-xl text-sm outline-none"
              style={{ background:'var(--bg-secondary)', border:`1px solid ${errors.symbol ? 'var(--red)':'var(--border)'}`, color:'var(--text-primary)' }}>
              <option value="">— Choose a stock —</option>
              {stocks.map(s => <option key={s.symbol} value={s.symbol}>{s.symbol} — {s.name} (${s.price?.toFixed(2)})</option>)}
            </select>
            {errors.symbol && <p className="text-xs" style={{ color:'var(--red)' }}>{errors.symbol}</p>}
          </div>
        )}

        {/* Step 2: Set condition */}
        {step === 2 && (
          <div className="space-y-4 fu">
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color:'var(--text-muted)' }}>Alert when price is…</label>
              <div className="grid grid-cols-2 gap-2">
                {['above','below'].map(t => (
                  <button key={t} onClick={() => setForm(f=>({...f,type:t}))}
                    className="py-3 rounded-xl text-sm font-medium capitalize transition-all"
                    style={{
                      background: form.type===t ? 'var(--accent-dim)' : 'var(--bg-secondary)',
                      color: form.type===t ? 'var(--accent)' : 'var(--text-muted)',
                      border: `1px solid ${form.type===t ? 'var(--accent)':'var(--border)'}`,
                    }}>
                    {t === 'above' ? '🚀 Above' : '🔻 Below'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color:'var(--text-muted)' }}>
                Target Price {currentStock && <span style={{color:'var(--text-primary)'}}>— Current: ${currentStock.price?.toFixed(2)}</span>}
              </label>
              <input type="number" placeholder="e.g. 195.00" value={form.targetPrice}
                onChange={e => setForm(f=>({...f,targetPrice:e.target.value}))}
                className="w-full px-3 py-3 rounded-xl text-sm outline-none font-mono"
                style={{ background:'var(--bg-secondary)', border:`1px solid ${errors.targetPrice?'var(--red)':'var(--border)'}`, color:'var(--text-primary)' }} />
              {errors.targetPrice && <p className="text-xs mt-1" style={{ color:'var(--red)' }}>{errors.targetPrice}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="space-y-4 fu">
            <p className="text-xs font-medium" style={{ color:'var(--text-muted)' }}>Confirm your alert</p>
            <div className="rounded-xl p-4 space-y-3" style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)' }}>
              {[
                ['Stock', `${form.symbol} — ${currentStock?.name ?? ''}`],
                ['Condition', form.type === 'above' ? '🚀 Price goes ABOVE' : '🔻 Price drops BELOW'],
                ['Target', `$${parseFloat(form.targetPrice).toFixed(2)}`],
                ['Current', `$${currentStock?.price?.toFixed(2) ?? '—'}`],
              ].map(([k,v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span style={{ color:'var(--text-muted)' }}>{k}</span>
                  <span className="font-medium font-mono" style={{ color:'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color:'var(--text-muted)' }}>
              You'll receive a browser notification when this condition is met. Make sure notifications are allowed.
            </p>
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex gap-2 mt-6">
          {step > 1 && (
            <button onClick={() => setStep(s=>s-1)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background:'var(--bg-secondary)', color:'var(--text-muted)', border:'1px solid var(--border)' }}>
              Back
            </button>
          )}
          {step < 3
            ? <button onClick={next}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1 transition-all"
                style={{ background:'var(--accent)', color:'#000' }}>
                Next <ChevronRight size={14}/>
              </button>
            : <button onClick={submit}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background:'var(--accent)', color:'#000' }}>
                Set Alert 🔔
              </button>
          }
        </div>
      </div>
    </div>
  );
}
