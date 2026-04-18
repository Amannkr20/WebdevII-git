import { useState } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import AddStudentForm from './components/AddStudentForm'
import StudentTable from './components/StudentTable'
import './App.css'

const initialStudents = [
  { id: 1, name: 'Aman', score: 78 },
  { id: 2, name: 'Riya', score: 45 },
  { id: 3, name: 'Karan', score: 90 },
  { id: 4, name: 'Neha', score: 32 },
]

function App() {
  const [students, setStudents] = useState(initialStudents)

  const addStudent = (name, score) => {
    setStudents(prev => [...prev, { id: Date.now(), name, score: Number(score) }])
  }

  const updateScore = (id, newScore) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, score: Number(newScore) } : s))
    )
  }

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  }

  const totalStudents = students.length
  const passed = students.filter(s => s.score >= 40).length
  const failed = totalStudents - passed
  const avgScore = totalStudents
    ? Math.round(students.reduce((sum, s) => sum + s.score, 0) / totalStudents)
    : 0

  return (
    <div className="app">
      <div className="noise" />
      <div className="container">
        <Header />
        <AddStudentForm onAdd={addStudent} />
        <StatsBar total={totalStudents} passed={passed} failed={failed} avg={avgScore} />
        <StudentTable students={students} onUpdateScore={updateScore} onDelete={deleteStudent} />
      </div>
    </div>
  )
}

export default App
