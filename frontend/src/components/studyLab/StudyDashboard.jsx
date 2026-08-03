import { BookOpen, FileText, Clock, Calendar } from "lucide-react";

function StudyDashboard({ uploadedCourses = [] }) {
  
  const totalCourses = uploadedCourses.length;
  
  const totalMaterials = uploadedCourses.reduce(
    (total, course) => total + (course.materials?.length || 0),
    0
  );

  const totalHours = uploadedCourses.reduce((total, course) => {

    const pages = (course.materials || []).reduce(
      (sum, material) => sum + (material.pages || 0),
      0
    );

    return total + pages / 8;

  }, 0);

  const nearestExam = uploadedCourses
    .filter((course) => course.examDate)
    .sort((a, b) => new Date(a.examDate) - new Date(b.examDate))[0];

  const calculateDaysLeft = () => {
    if (!nearestExam?.examDate) return null;
    const today = new Date();
    const exam = new Date(nearestExam.examDate);
    today.setHours(0, 0, 0, 0);
    exam.setHours(0, 0, 0, 0);
    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const daysLeft = calculateDaysLeft();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Courses */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total Courses
          </p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalCourses}
          </p>
        </div>
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <BookOpen size={22} />
        </div>
      </div>

      {/* Materials Uploaded */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Materials Uploaded
          </p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalMaterials}
          </p>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <FileText size={22} />
        </div>
      </div>

      {/* Total Reading Hours */}
      {/*
<div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
  <div className="space-y-1">
    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
      Estimated Reading
    </p>
    <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
      {totalHours ? totalHours.toFixed(1) : "0"}{" "}
      <span className="text-sm font-semibold text-slate-400">hrs</span>
    </p>
  </div>

  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
    <Clock size={22} />
  </div>
</div>
*/}
      {/* Nearest Exam */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Nearest Exam
          </p>
          <div className="flex items-baseline gap-1.5">
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {daysLeft !== null ? daysLeft : "--"}
            </p>
            {daysLeft !== null && (
              <span className="text-xs font-semibold text-rose-600">
                {daysLeft === 1 ? "day left" : "days left"}
              </span>
            )}
          </div>
          {nearestExam && (
            <p className="text-xs text-slate-400 truncate max-w-[120px]">
              {nearestExam.courseCode}
            </p>
          )}
        </div>
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
          <Calendar size={22} />
        </div>
      </div>
    </div>
  );
}

export default StudyDashboard;