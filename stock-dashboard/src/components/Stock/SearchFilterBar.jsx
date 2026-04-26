import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSelectedSector, toggleSort, SECTORS } from '../../store/slices/stocksSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { Search, ArrowUpDown } from 'lucide-react';

export default function SearchFilterBar() {
  const dispatch = useDispatch();
  const { selectedSector, sortBy, sortOrder } = useSelector(s => s.stocks);
  const [input, setInput] = useState('');
  const debounced = useDebounce(input, 380);

  useEffect(() => { dispatch(setSearchQuery(debounced)); }, [debounced, dispatch]);

  const sortOptions = [
    { value: 'symbol', label: 'Symbol' },
    { value: 'price', label: 'Price' },
    { value: 'changePercent', label: 'Change%' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input value={input} onChange={e => setInput(e.target.value)}
            placeholder="Search by name or symbol…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <select value={sortBy} onChange={e => dispatch(toggleSort(e.target.value))}
          className="px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          {sortOptions.map(o => (
            <option key={o.value} value={o.value}>
              {o.label} {sortBy === o.value ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scroll pb-1">
        {SECTORS.map(s => (
          <button key={s} onClick={() => dispatch(setSelectedSector(s))}
            className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
            style={{
              background: selectedSector === s ? 'var(--accent-dim)' : 'var(--bg-card)',
              color: selectedSector === s ? 'var(--accent)' : 'var(--text-muted)',
              border: `1px solid ${selectedSector === s ? 'var(--accent)' : 'var(--border)'}`,
            }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
