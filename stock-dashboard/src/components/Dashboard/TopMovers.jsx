import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TopMovers() {
  const stocks = useSelector(s => s.stocks.list);
  const { gainers, losers } = useMemo(() => {
    const sorted = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
    return { gainers: sorted.slice(0, 3), losers: sorted.slice(-3).reverse() };
  }, [stocks]);

  const Row = ({ stock, up }) => (
    <Link to={`/stock/${stock.symbol}`}
      className="flex items-center justify-between py-2 px-2 -mx-2 rounded-xl transition-all hover:opacity-80">
      <div className="flex items-center gap-2">
        {stock.logo
          ? <img src={stock.logo} alt={stock.symbol} className="w-6 h-6 rounded-lg bg-white object-contain p-0.5" />
          : <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>{stock.symbol.slice(0,2)}</div>
        }
        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{stock.symbol}</span>
      </div>
      <span className="text-xs font-mono font-semibold flex items-center gap-0.5"
        style={{ color: up ? 'var(--accent)' : 'var(--red)' }}>
        {up ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}
        {up ? '+' : ''}{stock.changePercent?.toFixed(2)}%
      </span>
    </Link>
  );

  return (
    <div className="rounded-2xl p-5 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Top Movers</h3>
      <div className="mb-3">
        <p className="text-xs mb-1 font-medium" style={{ color: 'var(--accent)' }}>▲ Gainers</p>
        {gainers.map(s => <Row key={s.symbol} stock={s} up />)}
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
        <p className="text-xs mb-1 font-medium" style={{ color: 'var(--red)' }}>▼ Losers</p>
        {losers.map(s => <Row key={s.symbol} stock={s} up={false} />)}
      </div>
    </div>
  );
}
