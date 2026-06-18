
function CourseTable({courses, deleteCourse}) {
    return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">
    Current Courses
  </h2>

  <table className="w-full">

    <thead>
      <tr className="border-b">
        <th className="text-left py-3">
          Course Code
        </th>

        <th className="text-left py-3">
          Unit
        </th>

        <th className="text-left py-3">
          Grade
        </th>

        <th className="text-left py-3">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      {courses.map((course) => (
        <tr
          key={course.courseCode}
          className="border-b"
        >
          <td className="py-3">
            {course.courseCode}
          </td>

          <td className="py-3">
            {course.unit}
          </td>

          <td className="py-3">
            {course.grade}
          </td>

          <td className="py-3">
  <button
    onClick={() =>
      deleteCourse(course.courseCode)
    }
    className="
      bg-red-500
      text-white
      px-3
      py-1
      rounded-lg
      hover:bg-red-600
      transition
    "
  >
    Delete
  </button>
</td>
        </tr>
      ))}
    </tbody>

  </table>

</div>
    )
}

export default CourseTable;