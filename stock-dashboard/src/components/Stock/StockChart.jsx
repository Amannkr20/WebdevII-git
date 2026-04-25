import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fetchCandles } from '../../utils/finnhub';

const RANGES = [
  { label:'1W', days:7,   res:'D' },
  { label:'1M', days:30,  res:'D' },
  { label:'3M', days:90,  res:'W' },
  { label:'6M', days:180, res:'W' },
];

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs shadow-xl" style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
      <p style={{ color:'var(--text-muted)' }}>{label}</p>
      <p className="font-mono font-bold mt-0.5" style={{ color:'var(--accent)' }}>${payload[0].value?.toFixed(2)}</p>
    </div>
  );
};

export default function StockChart({ symbol, isPositive }) {
  const [range, setRange]   = useState('1M');
  const [data, setData]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const cfg = RANGES.find(r => r.label === range);
  const color = isPositive ? 'var(--accent)' : 'var(--red)';

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(null);
    const to   = Math.floor(Date.now() / 1000);
    const from = to - cfg.days * 86400;

    fetchCandles(symbol, cfg.res, from, to)
      .then(raw => {
        if (cancelled) return;
        if (!raw || raw.s === 'no_data' || !raw.c) { setData([]); return; }
        const formatted = raw.t.map((ts, i) => ({
          date:   new Date(ts * 1000).toLocaleDateString('en-US', { month:'short', day:'numeric' }),
          price:  raw.c[i],
          volume: raw.v?.[i] ?? 0,
        }));
        setData(formatted);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [symbol, range]);

  return (
    <div className="rounded-2xl p-5 border" style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold" style={{ color:'var(--text-primary)' }}>Price History</h3>
        <div className="flex gap-1">
          {RANGES.map(r => (
            <button key={r.label} onClick={() => setRange(r.label)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
              style={{
                background: range===r.label ? 'var(--accent-dim)' : 'transparent',
                color: range===r.label ? 'var(--accent)' : 'var(--text-muted)',
                border: `1px solid ${range===r.label ? 'var(--accent)' : 'transparent'}`,
              }}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="h-[220px] flex items-center justify-center text-xs" style={{ color:'var(--text-muted)' }}>Loading chart…</div>}
      {error   && <div className="h-[220px] flex items-center justify-center text-xs" style={{ color:'var(--red)' }}>Chart unavailable</div>}
      {!loading && !error && data.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top:5, right:5, left:-20, bottom:0 }}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="date" tick={{ fontSize:9, fill:'var(--text-muted)' }} tickLine={false} axisLine={false} interval={Math.floor(data.length/5)}/>
              <YAxis tick={{ fontSize:9, fill:'var(--text-muted)' }} tickLine={false} axisLine={false} tickFormatter={v=>`$${v}`}/>
              <Tooltip content={<Tip/>}/>
              <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#cg)" dot={false} activeDot={{ r:4, fill:color }}/>
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs mt-2 mb-1" style={{ color:'var(--text-muted)' }}>Volume</p>
          <ResponsiveContainer width="100%" height={55}>
            <BarChart data={data} margin={{ top:0, right:5, left:-20, bottom:0 }}>
              <Bar dataKey="volume" fill={color} opacity={0.35} radius={[2,2,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
      {!loading && !error && data.length === 0 && (
        <div className="h-[220px] flex items-center justify-center text-xs" style={{ color:'var(--text-muted)' }}>No chart data available</div>
      )}
    </div>
  );
}
