import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/slices/stocksSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ total }) {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector(s => s.stocks);
  const pages = Math.ceil(total / itemsPerPage);
  if (pages <= 1) return null;

  const btn = (label, onClick, disabled, active = false) => (
    <button key={label} onClick={onClick} disabled={disabled}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all disabled:opacity-30"
      style={{
        background: active ? 'var(--accent-dim)' : 'var(--bg-card)',
        color: active ? 'var(--accent)' : 'var(--text-muted)',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      }}>
      {label}
    </button>
  );

  return (
    <div className="flex items-center justify-between mt-5">
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {Math.min((currentPage-1)*itemsPerPage+1, total)}–{Math.min(currentPage*itemsPerPage, total)} of {total}
      </span>
      <div className="flex gap-1">
        {btn(<ChevronLeft size={13} />, () => dispatch(setCurrentPage(currentPage-1)), currentPage===1)}
        {Array.from({length: pages},(_,i)=>i+1).map(p =>
          btn(p, () => dispatch(setCurrentPage(p)), false, p===currentPage)
        )}
        {btn(<ChevronRight size={13} />, () => dispatch(setCurrentPage(currentPage+1)), currentPage===pages)}
      </div>
    </div>
  );
}
