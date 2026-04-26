import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Layout/Navbar';
import ErrorBoundary from './components/UI/ErrorBoundary';
import { useAlertChecker } from './hooks/useAlertChecker';

const Dashboard  = lazy(() => import('./pages/Dashboard'));
const Market     = lazy(() => import('./pages/Market'));
const Watchlist  = lazy(() => import('./pages/Watchlist'));
const Alerts     = lazy(() => import('./pages/Alerts'));
const StockDetail = lazy(() => import('./pages/StockDetail'));

const Loader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="flex items-center gap-2 text-sm" style={{ color:'var(--text-muted)' }}>
      <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor:'var(--border)', borderTopColor:'var(--accent)' }}/>
      Loading…
    </div>
  </div>
);

function AppShell() {
  const isDark = useSelector(s => s.theme.isDark);
  useAlertChecker(60000); // check alerts every 60 seconds

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-primary)' }}>
      <Navbar/>
      <main>
        <ErrorBoundary>
          <Suspense fallback={<Loader/>}>
            <Routes>
              <Route path="/"              element={<Dashboard/>}/>
              <Route path="/market"        element={<Market/>}/>
              <Route path="/watchlist"     element={<Watchlist/>}/>
              <Route path="/alerts"        element={<Alerts/>}/>
              <Route path="/stock/:symbol" element={<StockDetail/>}/>
              <Route path="*" element={
                <div className="text-center py-32">
                  <p className="text-6xl font-mono font-bold mb-4" style={{color:'var(--border)'}}>404</p>
                  <p style={{color:'var(--text-muted)'}}>Page not found.</p>
                </div>
              }/>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell/>
    </BrowserRouter>
  );
}
