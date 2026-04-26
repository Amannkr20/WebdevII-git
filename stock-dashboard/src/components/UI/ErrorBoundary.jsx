import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(e, i) { console.error('ErrorBoundary:', e, i); }

  render() {
    if (this.state.hasError) return (
      <div className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border"
           style={{ borderColor:'var(--red)', background:'var(--red-dim)' }}>
        <span className="text-3xl">⚠️</span>
        <p className="text-sm font-medium" style={{ color:'var(--red)' }}>
          {this.state.error?.message || 'Something went wrong'}
        </p>
        <button onClick={() => this.setState({ hasError: false })}
          className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{ background:'var(--red-dim)', color:'var(--red)', border:'1px solid var(--red)' }}>
          Retry
        </button>
      </div>
    );
    return this.props.children;
  }
}
export default ErrorBoundary;
