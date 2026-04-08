function StatsBar({ total, passed, failed, avg }) {
  const passRate = total ? Math.round((passed / total) * 100) : 0

  const stats = [
    { label: 'Total', value: total, sub: 'students', color: 'stat-blue', icon: '👥' },
    { label: 'Passed', value: passed, sub: `${passRate}% rate`, color: 'stat-green', icon: '✅' },
    { label: 'Failed', value: failed, sub: `${100 - passRate}% rate`, color: 'stat-red', icon: '❌' },
    { label: 'Avg Score', value: avg, sub: 'class avg', color: 'stat-purple', icon: '📊' },
  ]

  return (
    <div className="stats-grid">
      {stats.map(s => (
        <div key={s.label} className={`stat-chip ${s.color}`}>
          <div className="stat-icon">{s.icon}</div>
          <div className="stat-info">
            <div className="stat-val">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsBar
