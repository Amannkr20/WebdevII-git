import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#00e5a0','#60a5fa','#f472b6','#fb923c','#a78bfa','#facc15','#38bdf8','#4ade80'];

export default function SectorChart() {
  const stocks = useSelector(s => s.stocks.list);
  const data = useMemo(() => {
    const counts = {};
    stocks.forEach(s => { counts[s.sector] = (counts[s.sector] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [stocks]);

  if (!data.length) return null;

  return (
    <div className="rounded-2xl p-5 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Sectors</h3>
      <ResponsiveContainer width="100%" height={190}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'12px', fontSize:'11px', color:'var(--text-primary)' }} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:'10px', color:'var(--text-muted)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
