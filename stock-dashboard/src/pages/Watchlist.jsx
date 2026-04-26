import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../store/slices/otherSlices';
import StockCard from '../components/Stock/StockCard';
import { Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Watchlist() {
  const dispatch = useDispatch();
  const symbols  = useSelector(s => s.watchlist.items);
  const stocks   = useSelector(s => s.stocks.list);
  const watched  = stocks.filter(s => symbols.includes(s.symbol));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div className="flex items-center justify-between fu">
        <div className="flex items-center gap-2">
          <Star size={20} style={{ color:'var(--yellow)' }} fill="currentColor"/>
          <div>
            <h1 className="text-2xl font-bold" style={{ color:'var(--text-primary)' }}>Watchlist</h1>
            <p className="text-sm" style={{ color:'var(--text-muted)' }}>{watched.length} tracked</p>
          </div>
        </div>
        {watched.length > 0 && (
          <button onClick={() => symbols.forEach(s => dispatch(removeFromWatchlist(s)))}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background:'var(--red-dim)', color:'var(--red)', border:'1px solid var(--red)' }}>
            <Trash2 size={12}/> Clear all
          </button>
        )}
      </div>

      {watched.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center fu1">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:'var(--yellow-dim)', border:'1px solid var(--yellow)' }}>
            <Star size={28} style={{ color:'var(--yellow)' }}/>
          </div>
          <h3 className="text-lg font-bold" style={{ color:'var(--text-primary)' }}>No stocks watched yet</h3>
          <p className="text-sm" style={{ color:'var(--text-muted)' }}>Tap ★ on any stock card to track it here.</p>
          <Link to="/market" className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ background:'var(--accent-dim)', color:'var(--accent)', border:'1px solid var(--accent)' }}>
            Browse Market →
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fu1">
            {[
              { label:'Watched',  val: watched.length },
              { label:'Gainers',  val: watched.filter(s=>s.changePercent>0).length, color:'var(--accent)' },
              { label:'Losers',   val: watched.filter(s=>s.changePercent<0).length, color:'var(--red)' },
              { label:'Avg Chg',  val: (watched.reduce((a,s)=>a+s.changePercent,0)/watched.length).toFixed(2)+'%',
                color: watched.reduce((a,s)=>a+s.changePercent,0)>=0 ? 'var(--accent)' : 'var(--red)' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl p-4 border" style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
                <div className="text-xs mb-1" style={{ color:'var(--text-muted)' }}>{item.label}</div>
                <div className="text-xl font-mono font-bold" style={{ color: item.color || 'var(--text-primary)' }}>{item.val}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 fu2">
            {watched.map((s,i) => (
              <div key={s.symbol} className="fu" style={{animationDelay:`${i*0.05}s`}}>
                <StockCard stock={s}/>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
