import StudentRow from './StudentRow'

function StudentTable({ students, onUpdateScore, onDelete }) {
  return (
    <section className="table-card">
      <div className="table-card-header">
        <span className="table-card-title">📋 Student Records</span>
        <span className="badge-count">{students.length} {students.length === 1 ? 'entry' : 'entries'}</span>
      </div>
      <div className="table-scroll">
        <table className="stbl">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
              <th>Status</th>
              <th>Update</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan={6} className="empty-msg">No students yet — add one above!</td></tr>
            ) : (
              students.map((s, i) => (
                <StudentRow
                  key={s.id}
                  index={i + 1}
                  student={s}
                  onUpdateScore={onUpdateScore}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default StudentTable
