import { useState } from 'react'

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [error, setError] = useState('')
  const [pulse, setPulse] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    const num = Number(score)
    if (!trimmed) return setError('Please enter a student name.')
    if (score === '' || isNaN(num) || num < 0 || num > 100)
      return setError('Score must be between 0 and 100.')
    setError('')
    onAdd(trimmed, num)
    setName('')
    setScore('')
    setPulse(true)
    setTimeout(() => setPulse(false), 500)
  }

  return (
    <section className={`form-card ${pulse ? 'pulse-once' : ''}`}>
      <div className="form-card-header">
        <span className="form-card-title">➕ Add New Student</span>
      </div>
      <form onSubmit={handleSubmit} className="form-body" noValidate>
        <div className="form-row">
          <input
            className="finput"
            type="text"
            placeholder="Student name"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
            maxLength={40}
          />
          <input
            className="finput finput-score"
            type="number"
            placeholder="Score (0–100)"
            value={score}
            min={0} max={100}
            onChange={e => { setScore(e.target.value); setError('') }}
          />
          <button type="submit" className="btn-primary">Add Student</button>
        </div>
        {error && <p className="form-err">⚠ {error}</p>}
      </form>
    </section>
  )
}

export default AddStudentForm
