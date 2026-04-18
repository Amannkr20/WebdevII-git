import { useState } from 'react'

function getGrade(score) {
  if (score >= 90) return { letter: 'A+', color: '#a78bfa' }
  if (score >= 80) return { letter: 'A',  color: '#60a5fa' }
  if (score >= 70) return { letter: 'B',  color: '#34d399' }
  if (score >= 60) return { letter: 'C',  color: '#fbbf24' }
  if (score >= 40) return { letter: 'D',  color: '#fb923c' }
  return { letter: 'F', color: '#f87171' }
}

function ScoreBar({ score }) {
  const pct = Math.min(score, 100)
  const { color } = getGrade(score)
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

function StudentRow({ index, student, onUpdateScore, onDelete }) {
  const [val, setVal] = useState(String(student.score))
  const [saved, setSaved] = useState(false)
  const pass = student.score >= 40
  const grade = getGrade(student.score)

  const handleSave = () => {
    const n = Number(val)
    if (val === '' || isNaN(n) || n < 0 || n > 100) return
    onUpdateScore(student.id, n)
    setSaved(true)
    setTimeout(() => setSaved(false), 1200)
  }

  return (
    <tr className={`srow ${pass ? 'srow-pass' : 'srow-fail'}`}>
      <td className="td-idx">{index}</td>
      <td className="td-name">
        <div className="name-avatar" style={{ background: grade.color + '22', color: grade.color }}>
          {student.name.charAt(0).toUpperCase()}
        </div>
        {student.name}
      </td>
      <td className="td-score">
        <span className="score-num" style={{ color: grade.color }}>{student.score}</span>
        <span className="grade-badge" style={{ background: grade.color + '22', color: grade.color }}>
          {grade.letter}
        </span>
        <ScoreBar score={student.score} />
      </td>
      <td className="td-status">
        <span className={`pill ${pass ? 'pill-pass' : 'pill-fail'}`}>
          {pass ? '✓ Pass' : '✗ Fail'}
        </span>
      </td>
      <td className="td-update">
        <div className="update-wrap">
          <input
            className="upd-input"
            type="number"
            value={val}
            min={0} max={100}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
          <button className={`btn-save ${saved ? 'btn-saved' : ''}`} onClick={handleSave}>
            {saved ? '✓' : 'Save'}
          </button>
        </div>
      </td>
      <td className="td-del">
        <button className="btn-del" onClick={() => onDelete(student.id)} title="Remove">×</button>
      </td>
    </tr>
  )
}

export default StudentRow
