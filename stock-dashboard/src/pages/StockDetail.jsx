import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../store/slices/otherSlices';
import StockChart from '../components/Stock/StockChart';
import AddAlertModal from '../components/Alerts/AddAlertModal';
import ErrorBoundary from '../components/UI/ErrorBoundary';
import { ArrowLeft, Star, Bell, TrendingUp, TrendingDown } from 'lucide-react';

export default function StockDetail() {
  const { symbol }  = useParams();
  const navigate    = useNavigate();
  const dispatch    = useDispatch();
  const stocks      = useSelector(s => s.stocks.list);
  const watchlist   = useSelector(s => s.watchlist.items);
  const stock       = stocks.find(s => s.symbol === symbol);
  const isWatched   = watchlist.includes(symbol);
  const [showAlert, setShowAlert] = useState(false);

  if (!stock) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <p className="text-4xl mb-4">🔍</p>
      <p className="text-lg font-bold mb-2" style={{color:'var(--text-primary)'}}>Stock not found</p>
      <button onClick={() => navigate('/market')} className="px-5 py-2.5 rounded-xl text-sm font-bold mt-4"
        style={{ background:'var(--accent-dim)', color:'var(--accent)', border:'1px solid var(--accent)' }}>
        Back to Market
      </button>
    </div>
  );

  const isUp = stock.changePercent >= 0;

  const meta = [
    { label:'Open',      val:`$${stock.open?.toFixed(2)??'—'}` },
    { label:'Prev Close',val:`$${stock.prevClose?.toFixed(2)??'—'}` },
    { label:'Day High',  val:`$${stock.high?.toFixed(2)??'—'}` },
    { label:'Day Low',   val:`$${stock.low?.toFixed(2)??'—'}` },
    { label:'Market Cap',val: stock.marketCap??'—' },
    { label:'Sector',    val: stock.sector??'—' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm transition-colors fu"
        style={{ color:'var(--text-muted)' }}>
        <ArrowLeft size={14}/> Back
      </button>

      {/* Hero */}
      <div className="rounded-2xl p-6 border fu1" style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {stock.logo
              ? <img src={stock.logo} alt={symbol} className="w-14 h-14 rounded-2xl bg-white object-contain p-1.5"/>
              : <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-lg"
                  style={{ background:'var(--accent-dim)', color:'var(--accent)' }}>{symbol.slice(0,2)}</div>
            }
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold" style={{color:'var(--text-primary)'}}>{symbol}</h1>
                <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background:'var(--accent-dim)', color:'var(--accent)' }}>{stock.sector}</span>
              </div>
              <p className="text-sm mt-0.5" style={{color:'var(--text-muted)'}}>{stock.name}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => isWatched ? dispatch(removeFromWatchlist(symbol)) : dispatch(addToWatchlist(symbol))}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: isWatched?'var(--yellow-dim)':'var(--bg-secondary)', color: isWatched?'var(--yellow)':'var(--text-muted)', border:`1px solid ${isWatched?'var(--yellow)':'var(--border)'}` }}>
              <Star size={14} fill={isWatched?'currentColor':'none'}/>{isWatched?'Watching':'Watch'}
            </button>
            <button onClick={() => setShowAlert(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background:'var(--accent)', color:'#000' }}>
              <Bell size={14}/> Set Alert
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-end gap-4 flex-wrap">
          <div>
            <div className="text-4xl font-mono font-bold" style={{color:'var(--text-primary)'}}>${stock.price?.toFixed(2)??'—'}</div>
            <div className="flex items-center gap-1.5 mt-1 text-sm font-mono font-semibold"
              style={{ color: isUp?'var(--accent)':'var(--red)' }}>
              {isUp?<TrendingUp size={14}/>:<TrendingDown size={14}/>}
              {isUp?'+':''}{stock.change?.toFixed(2)??'0.00'} ({isUp?'+':''}{stock.changePercent?.toFixed(2)??'0.00'}%) today
            </div>
          </div>
          <div className="flex flex-wrap gap-5 ml-auto">
            {meta.map(m => (
              <div key={m.label} className="text-right">
                <div className="text-xs" style={{color:'var(--text-muted)'}}>{m.label}</div>
                <div className="text-sm font-mono font-semibold" style={{color:'var(--text-primary)'}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ErrorBoundary>
        <StockChart symbol={symbol} isPositive={isUp}/>
      </ErrorBoundary>

      {showAlert && <AddAlertModal onClose={() => setShowAlert(false)} defaultSymbol={symbol}/>}
    </div>
  );
}
