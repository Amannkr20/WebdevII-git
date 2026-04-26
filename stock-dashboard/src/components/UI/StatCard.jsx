import React from 'react';

export default function StatCard({ title, value, sub, icon: Icon, accent }) {
  return (
    <div className="rounded-2xl p-5 border transition-all"
      style={{ background: accent ? 'var(--accent-dim)' : 'var(--bg-card)', borderColor: accent ? 'var(--accent)' : 'var(--border)' }}>
      <div className="flex items-center gap-2 mb-3">
        {Icon && <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.06)' }}>
          <Icon size={14} style={{ color: accent ? 'var(--accent)' : 'var(--text-muted)' }} />
        </div>}
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{title}</span>
      </div>
      <div className="text-2xl font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  );
}
