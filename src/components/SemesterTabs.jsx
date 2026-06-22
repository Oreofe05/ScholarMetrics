function SemesterTabs({
  semesters,
  activeSemester,
  setActiveSemester,
  editingSemester,
  setEditingSemester,
  renameSemester,
  deleteSemester,
  addSemester,
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {semesters.map((sem, index) => (
        <div
          key={sem.id}
          className="flex items-center gap-2"
        >
          {editingSemester === sem.id ? (
            <input
              value={
                sem.customName ||
                `Semester ${index + 1}`
              }
              autoFocus
              onChange={(e) =>
                renameSemester(
                  sem.id,
                  e.target.value
                )
              }
              onBlur={() =>
                setEditingSemester(null)
              }
              className="px-3 py-2 border rounded"
            />
          ) : (
            <button
              onClick={() =>
                setActiveSemester(sem.id)
              }
              onDoubleClick={() =>
                setEditingSemester(sem.id)
              }
              className={`px-4 py-2 rounded-lg ${
                activeSemester === sem.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white border"
              }`}
            >
              {sem.customName ||
                `Semester ${index + 1}`}
            </button>
          )}

          <button
            onClick={() =>
              deleteSemester(sem.id)
            }
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            ×
          </button>
        </div>
      ))}

      <button
        onClick={addSemester}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        + Add Semester
      </button>
    </div>
  );
}

export default SemesterTabs;