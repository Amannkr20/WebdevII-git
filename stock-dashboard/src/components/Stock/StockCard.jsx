import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../../store/slices/otherSlices';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

const StockCard = memo(function StockCard({ stock }) {
  const dispatch = useDispatch();
  const watchlist = useSelector(s => s.watchlist.items);
  const isWatched = watchlist.includes(stock.symbol);
  const isUp = stock.changePercent >= 0;

  return (
    <div className="rounded-2xl p-4 border transition-all duration-200 hover:scale-[1.02]"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <div className="flex items-start justify-between mb-3">
        <Link to={`/stock/${stock.symbol}`} className="flex items-center gap-2 flex-1">
          {stock.logo ? (
            <img src={stock.logo} alt={stock.symbol} className="w-9 h-9 rounded-xl object-contain bg-white p-1" />
          ) : (
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
              {stock.symbol.slice(0, 2)}
            </div>
          )}
          <div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{stock.symbol}</div>
            <div className="text-xs truncate max-w-[110px]" style={{ color: 'var(--text-muted)' }}>{stock.name}</div>
          </div>
        </Link>
        <button onClick={() => isWatched ? dispatch(removeFromWatchlist(stock.symbol)) : dispatch(addToWatchlist(stock.symbol))}
          className="p-1.5 rounded-lg transition-all"
          style={{ color: isWatched ? 'var(--yellow)' : 'var(--text-muted)', background: isWatched ? 'var(--yellow-dim)' : 'transparent' }}>
          <Star size={14} fill={isWatched ? 'currentColor' : 'none'} />
        </button>
      </div>

      <Link to={`/stock/${stock.symbol}`}>
        <div className="text-xl font-mono font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          ${stock.price?.toFixed(2) ?? '—'}
        </div>
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-lg text-xs" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
            {stock.sector?.split(' ')[0] ?? '—'}
          </span>
          <span className="flex items-center gap-0.5 text-xs font-mono font-semibold px-2 py-0.5 rounded-lg"
            style={{ color: isUp ? 'var(--accent)' : 'var(--red)', background: isUp ? 'var(--accent-dim)' : 'var(--red-dim)' }}>
            {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {isUp ? '+' : ''}{stock.changePercent?.toFixed(2) ?? '0.00'}%
          </span>
        </div>
      </Link>
    </div>
  );
});

export default StockCard;
