import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/otherSlices';
import { Sun, Moon, TrendingUp, LayoutDashboard, Star, Bell } from 'lucide-react';

export default function Navbar() {
  const dispatch   = useDispatch();
  const isDark     = useSelector(s => s.theme.isDark);
  const watchCount = useSelector(s => s.watchlist.items.length);
  const alertCount = useSelector(s => s.alerts.items.filter(a => !a.triggered).length);
  const { pathname } = useLocation();

  const links = [
    { to:'/',          label:'Dashboard', icon: LayoutDashboard },
    { to:'/market',    label:'Market',    icon: TrendingUp },
    { to:'/watchlist', label:'Watchlist', icon: Star,  badge: watchCount },
    { to:'/alerts',    label:'Alerts',    icon: Bell,  badge: alertCount },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background:'var(--bg-nav)', borderColor:'var(--border)', backdropFilter:'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight" style={{ color:'var(--text-primary)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:'var(--accent)' }}>
            <TrendingUp size={15} className="text-black" />
          </div>
          Stock<span style={{ color:'var(--accent)' }}>Pulse</span>
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {links.map(({ to, label, icon: Icon, badge }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to} className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all"
                style={{ color: active ? 'var(--accent)' : 'var(--text-muted)', background: active ? 'var(--accent-dim)' : 'transparent' }}>
                <Icon size={14} />
                {label}
                {badge > 0 && (
                  <span className="ml-0.5 text-xs rounded-full w-4 h-4 flex items-center justify-center text-black font-bold"
                    style={{ background:'var(--accent)', fontSize:'9px' }}>{badge}</span>
                )}
              </Link>
            );
          })}
        </div>

        <button onClick={() => dispatch(toggleTheme())}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{ border:'1px solid var(--border)', color:'var(--text-muted)' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      {/* Mobile bottom nav */}
      <div className="sm:hidden flex border-t" style={{ borderColor:'var(--border)' }}>
        {links.map(({ to, label, icon: Icon, badge }) => {
          const active = pathname === to;
          return (
            <Link key={to} to={to} className="relative flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors"
              style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }}>
              <Icon size={17} />
              {label}
              {badge > 0 && (
                <span className="absolute top-1 right-1/4 text-black text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold"
                  style={{ background:'var(--accent)', fontSize:'8px' }}>{badge}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
