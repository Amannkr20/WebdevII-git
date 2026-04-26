import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllStocks } from '../store/slices/stocksSlice';
import StatCard from '../components/UI/StatCard';
import TopMovers from '../components/Dashboard/TopMovers';
import SectorChart from '../components/Dashboard/SectorChart';
import StockCard from '../components/Stock/StockCard';
import ErrorBoundary from '../components/UI/ErrorBoundary';
import { BarChart2, TrendingUp, TrendingDown, RefreshCw, Bell, Star } from 'lucide-react';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list: stocks, status, lastUpdated } = useSelector(s => s.stocks);
  const watchlistSymbols = useSelector(s => s.watchlist.items);
  const activeAlerts     = useSelector(s => s.alerts.items.filter(a => !a.triggered));

  useEffect(() => { dispatch(fetchAllStocks()); }, [dispatch]);

  const stats = useMemo(() => {
    if (!stocks.length) return {};
    const gainers = stocks.filter(s => s.changePercent > 0).length;
    const losers  = stocks.filter(s => s.changePercent < 0).length;
    const top     = [...stocks].sort((a,b) => b.changePercent - a.changePercent)[0];
    return { gainers, losers, top };
  }, [stocks]);

  const watchlistStocks = stocks.filter(s => watchlistSymbols.includes(s.symbol));

  const Skeleton = () => (
    <div className="rounded-2xl p-4 border animate-pulse" style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
      <div className="flex gap-2 mb-3"><div className="w-9 h-9 rounded-xl" style={{background:'var(--border)'}}/><div className="space-y-1.5"><div className="w-12 h-3 rounded" style={{background:'var(--border)'}}/><div className="w-20 h-2 rounded" style={{background:'var(--border)'}}/></div></div>
      <div className="w-16 h-5 rounded mb-2" style={{background:'var(--border)'}}/>
      <div className="w-full h-3 rounded" style={{background:'var(--border)'}}/>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between fu">
        <div>
          <h1 className="text-2xl font-bold" style={{ color:'var(--text-primary)' }}>Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color:'var(--text-muted)' }}>Live market overview</p>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color:'var(--text-muted)' }}>
          <RefreshCw size={11} className={status==='loading' ? 'animate-spin' : ''} style={{ color: status==='loading' ? 'var(--accent)' : 'var(--text-muted)' }}/>
          {lastUpdated ? `Updated ${lastUpdated}` : status === 'loading' ? 'Fetching live data…' : ''}
        </div>
      </div>

      {status === 'failed' && (
        <div className="rounded-2xl p-4 text-sm" style={{ background:'var(--red-dim)', border:'1px solid var(--red)', color:'var(--red)' }}>
          ⚠️ API error — showing mock data. For live prices: create <code>.env</code> with <code>VITE_FINNHUB_KEY=yourkey</code> from{' '}
          <a href="https://finnhub.io/register" target="_blank" style={{textDecoration:'underline'}}>finnhub.io/register</a> (free).
        </div>
      )}
      {stocks.length > 0 && status === 'succeeded' && !import.meta.env.VITE_FINNHUB_KEY && (
        <div className="rounded-xl px-4 py-2.5 text-xs flex items-center gap-2" style={{ background:'var(--yellow-dim)', border:'1px solid var(--yellow)', color:'var(--yellow)' }}>
          📋 <span>Running on <strong>demo data</strong>. Add your free Finnhub API key to <code>.env</code> for live prices.</span>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fu1">
        <StatCard title="Tracking"  value={`${stocks.length}`}   sub="live stocks"         icon={BarChart2} accent />
        <StatCard title="Gainers"   value={stats.gainers ?? '—'} sub="in the green today"  icon={TrendingUp}/>
        <StatCard title="Losers"    value={stats.losers  ?? '—'} sub="in the red today"    icon={TrendingDown}/>
        <StatCard title="Top Gainer" value={stats.top?.symbol ?? '—'} sub={stats.top ? `+${stats.top.changePercent?.toFixed(2)}%` : ''} icon={TrendingUp}/>
      </div>

      {/* Quick links */}
      <div className="flex gap-3 fu2">
        {activeAlerts.length > 0 && (
          <Link to="/alerts" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ background:'var(--yellow-dim)', color:'var(--yellow)', border:'1px solid var(--yellow)' }}>
            <Bell size={14}/> {activeAlerts.length} Active Alert{activeAlerts.length>1?'s':''}
          </Link>
        )}
        <Link to="/alerts" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={{ background:'var(--accent-dim)', color:'var(--accent)', border:'1px solid var(--accent)' }}>
          <Bell size={14}/> Set Price Alert
        </Link>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 fu3">
        <div className="lg:col-span-2 space-y-4">
          {/* Watchlist */}
          {watchlistStocks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Star size={13} style={{ color:'var(--yellow)' }} fill="currentColor"/>
                  <h2 className="text-sm font-bold" style={{ color:'var(--text-primary)' }}>Watchlist</h2>
                </div>
                <Link to="/watchlist" className="text-xs transition-colors" style={{ color:'var(--accent)' }}>View all →</Link>
              </div>
              <ErrorBoundary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {watchlistStocks.map(s => <StockCard key={s.symbol} stock={s}/>)}
                </div>
              </ErrorBoundary>
            </div>
          )}

          {/* All stocks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold" style={{ color:'var(--text-primary)' }}>All Stocks</h2>
              <Link to="/market" className="text-xs" style={{ color:'var(--accent)' }}>Browse →</Link>
            </div>
            <ErrorBoundary>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {status === 'loading' && !stocks.length
                  ? Array.from({length:6}).map((_,i) => <Skeleton key={i}/>)
                  : stocks.slice(0,6).map(s => <StockCard key={s.symbol} stock={s}/>)
                }
              </div>
            </ErrorBoundary>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 fu4">
          <ErrorBoundary><TopMovers/></ErrorBoundary>
          <ErrorBoundary><SectorChart/></ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
