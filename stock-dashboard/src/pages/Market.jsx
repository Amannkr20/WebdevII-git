import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectFiltered } from '../store/slices/stocksSlice';
import SearchFilterBar from '../components/Stock/SearchFilterBar';
import Pagination from '../components/UI/Pagination';
import ErrorBoundary from '../components/UI/ErrorBoundary';

const StockCard = lazy(() => import('../components/Stock/StockCard'));

const Skeleton = () => (
  <div className="rounded-2xl p-4 border animate-pulse" style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
    <div className="flex gap-2 mb-3"><div className="w-9 h-9 rounded-xl" style={{background:'var(--border)'}}/><div className="space-y-1.5 flex-1"><div className="w-14 h-3 rounded" style={{background:'var(--border)'}}/><div className="w-24 h-2 rounded" style={{background:'var(--border)'}}/></div></div>
    <div className="w-16 h-5 rounded mb-2" style={{background:'var(--border)'}}/>
    <div className="w-full h-3 rounded" style={{background:'var(--border)'}}/>
  </div>
);

export default function Market() {
  const filtered = useSelector(selectFiltered);
  const { currentPage, itemsPerPage, status, searchQuery, selectedSector } = useSelector(s => s.stocks);
  const paginated = filtered.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div className="fu">
        <h1 className="text-2xl font-bold" style={{ color:'var(--text-primary)' }}>Market</h1>
        <p className="text-sm mt-0.5" style={{ color:'var(--text-muted)' }}>
          {filtered.length} stock{filtered.length!==1?'s':''}
          {searchQuery ? ` matching "${searchQuery}"` : ''}
          {selectedSector!=='All' ? ` in ${selectedSector}` : ''}
        </p>
      </div>

      <ErrorBoundary><SearchFilterBar/></ErrorBoundary>

      <ErrorBoundary>
        {status==='loading' && !filtered.length
          ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">{Array.from({length:8}).map((_,i)=><Skeleton key={i}/>)}</div>
          : filtered.length === 0
          ? <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
              <span className="text-4xl">🔍</span>
              <p className="text-base font-semibold" style={{color:'var(--text-primary)'}}>No stocks found</p>
              <p className="text-sm" style={{color:'var(--text-muted)'}}>Try adjusting search or filters</p>
            </div>
          : <>
              <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">{Array.from({length:itemsPerPage}).map((_,i)=><Skeleton key={i}/>)}</div>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 fu1">
                  {paginated.map((s,i) => (
                    <div key={s.symbol} className="fu" style={{animationDelay:`${i*0.04}s`}}>
                      <StockCard stock={s}/>
                    </div>
                  ))}
                </div>
              </Suspense>
              <Pagination total={filtered.length}/>
            </>
        }
      </ErrorBoundary>
    </div>
  );
}
