import {
  BrainCircuit,
  BookOpen,
  Clock,
  Flame,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

function StudyOverview({ uploadedCourses = [] }) {
  const totalCourses = uploadedCourses.length;

  const totalHours = uploadedCourses.reduce(
    (sum, course) => sum + (course.estimatedHours || 0),
    0
  );

  const totalChapters = uploadedCourses.reduce((sum, course) => {
    const chapters =
      course.analysis?.reduce((chapterTotal, report) => {
        return chapterTotal + (report.progress?.length || 0);
      }, 0) || 0;

    return sum + chapters;
  }, 0);

  const nearestCourse = uploadedCourses
    .filter((course) => course.examDate)
    .sort((a, b) => new Date(a.examDate) - new Date(b.examDate))[0];

  let nearestDays = null;

  if (nearestCourse) {
    const today = new Date();
    const exam = new Date(nearestCourse.examDate);

    today.setHours(0, 0, 0, 0);
    exam.setHours(0, 0, 0, 0);

    nearestDays = Math.max(
      0,
      Math.ceil(
        (exam.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase mb-1">
            <BrainCircuit size={16} />
            <span>Smart Analytics</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI Study Insights
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time workload metrics and prioritized recommendations
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Courses */}
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
          <div className="flex justify-between items-center text-sky-600 mb-2">
            <span className="text-xs uppercase font-semibold">
              Courses
            </span>
            <BookOpen size={16} />
          </div>

          <h3 className="text-3xl font-bold text-sky-900">
            {totalCourses}
          </h3>
        </div>

        {/* Chapters */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="flex justify-between items-center text-emerald-600 mb-2">
            <span className="text-xs uppercase font-semibold">
              Chapters
            </span>
            <Flame size={16} />
          </div>

          <h3 className="text-3xl font-bold text-emerald-900">
            {totalChapters}
          </h3>
        </div>

        {/* Hours */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <div className="flex justify-between items-center text-indigo-600 mb-2">
            <span className="text-xs uppercase font-semibold">
              Reading Hours
            </span>
            <Clock size={16} />
          </div>

          <h3 className="text-3xl font-bold text-indigo-900">
            {totalHours.toFixed(1)}
          </h3>
        </div>

        {/* Exam */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
          <div className="flex justify-between items-center text-rose-600 mb-2">
            <span className="text-xs uppercase font-semibold">
              Nearest Exam
            </span>
            <AlertCircle size={16} />
          </div>

          {nearestCourse ? (
            <>
              <h3 className="font-bold text-lg text-rose-900">
                {nearestCourse.courseCode}
              </h3>

              <p className="text-xs text-rose-600 mt-1">
                {nearestDays} day
                {nearestDays !== 1 ? "s" : ""} left
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              No exam scheduled
            </p>
          )}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5 flex gap-4">
        <div className="bg-indigo-600 text-white rounded-xl p-2 h-fit">
          <Lightbulb size={18} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 mb-1">
            AI Recommendation
          </h3>

          {nearestCourse ? (
            <>
              <p className="text-sm text-slate-700">
                Focus on{" "}
                <span className="font-semibold text-indigo-700">
                  {nearestCourse.courseCode}
                </span>{" "}
                because it has the nearest examination.
              </p>

              <p className="text-xs text-slate-500 mt-2">
                Complete all remaining chapters, review the generated
                summary, then practice with flashcards and quizzes.
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              Upload materials and set an exam date to receive
              personalized recommendations.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyOverview;