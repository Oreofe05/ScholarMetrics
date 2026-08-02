function AddCourse({
  courseCode,
  setCourseCode,
  courseName,
  setCourseName,
  examDate,
  setExamDate,
  addCourse,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Add New Course
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) =>
            setCourseCode(e.target.value)
          }
          className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) =>
            setCourseName(e.target.value)
          }
          className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="date"
          value={examDate}
          onChange={(e) =>
            setExamDate(e.target.value)
          }
          className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          onClick={addCourse}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
        >
          Add Course
        </button>

      </div>

    </div>
  );
}

export default AddCourse;