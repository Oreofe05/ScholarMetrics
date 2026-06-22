
function AddCourseForm({
  courseCode,
  setCourseCode,
  courseUnit,
  setCourseUnit,
  grade,
  setGrade,
  addCourse,
}) {
    return (
    <div>

  <h2 className="text-2xl font-bold mb-6">
    Add Course
  </h2>

  <div className="space-y-4">

    <input
      type="text"
      maxLength={10}

      placeholder="e.g csc101"
      value={courseCode}
      onChange={(e) =>
        setCourseCode(e.target.value.toUpperCase())
      }
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
    />

    <input
      type="number"
      min="1"
      max="4"
      placeholder="Course Unit"
      value={courseUnit}
      onChange={(e) =>
        setCourseUnit(e.target.value)
      }
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
    />

    <select
      value={grade}
      onChange={(e) =>
        setGrade(e.target.value)
      }
      className="w-full border rounded-xl p-3"
    >
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="F">F</option> 
      </select>


    <button
    onClick={addCourse}
      className="
        bg-indigo-600
        text-white
        rounded-xl
        px-4
        py-3
        w-full
      "
    >
      Add Course
    </button>

  </div>
  </div>
    )


}

export default AddCourseForm;