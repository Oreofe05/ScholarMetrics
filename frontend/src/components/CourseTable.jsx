import { Pencil, Trash2, GraduationCap, BookOpen } from "lucide-react";

function CourseTable({ courses = [], deleteCourse, editCourse }) {
  const getGradeBadgeColor = (grade) => {
    const letter = grade?.toString().toUpperCase().trim();

    switch (letter) {
      case "A":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "B":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "C":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "D":
        return "bg-orange-50 text-orange-700 border-orange-200/80";
      case "F":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 sm:p-6 space-y-5 mt-6">

      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <GraduationCap size={20} />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Current Courses
            </h2>

            <p className="text-xs text-slate-500">
              Registered academic modules and recorded grades
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {courses.length} {courses.length === 1 ? "Course" : "Courses"}
        </span>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">

          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center mx-auto mb-3">
            <BookOpen size={20} className="text-slate-400" />
          </div>

          <h3 className="text-sm font-semibold text-slate-800">
            No Courses Added
          </h3>

          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Add your registered modules to compute GPAs and track overall performance.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm border-collapse">

            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/50 text-slate-500 font-semibold text-xs uppercase tracking-wider">

                <th className="py-3 px-4 rounded-l-xl">
                  Course Code
                </th>

                <th className="py-3 px-4">
                  Course Name
                </th>

                <th className="py-3 px-4">
                  Units
                </th>

                <th className="py-3 px-4">
                  Semester
                </th>

                <th className="py-3 px-4">
                  Level
                </th>

                <th className="py-3 px-4">
                  Exam Date
                </th>

                <th className="py-3 px-4 text-right rounded-r-xl">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {courses.map((course) => (

                <tr
                  key={course.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >

                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {course.courseCode}
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    {course.courseName}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {course.units}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    {course.semester}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    {course.level}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    {course.examDate
                      ? new Date(course.examDate).toLocaleDateString()
                      : "--"}
                  </td>

                  <td className="py-3.5 px-4 text-right">

                    <div className="inline-flex items-center justify-end gap-1">

                      <button
                        onClick={() => editCourse(course)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default CourseTable;