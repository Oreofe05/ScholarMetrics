import { CalendarDays, MoreHorizontal, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { generateUpcomingExams } from "../utils/generateUpcomingExams";

function UpcomingExams() {
  const { uploadedCourses } = useApp();

  const exams = generateUpcomingExams(uploadedCourses);

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return {
          badge: "bg-rose-50 text-rose-700 border-rose-100",
          bar: "bg-rose-500",
        };

      case "warning":
        return {
          badge: "bg-amber-50 text-amber-700 border-amber-100",
          bar: "bg-amber-500",
        };

      default:
        return {
          badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
          bar: "bg-emerald-500",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/80 p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <CalendarDays size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
              Upcoming Exams
            </h2>
            <p className="text-slate-400 text-[11px]">
              Stay ahead of your schedule
            </p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-slate-500 transition">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      {exams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 my-auto">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-700">All Clear!</p>
          <p className="text-[11px] text-slate-400 mt-0.5">No upcoming exams scheduled.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {exams.map((exam) => {
            const colors = getStatusColor(exam.status);

            return (
              <div
                key={exam.id}
                className="bg-slate-50/40 border border-slate-100 rounded-xl p-3.5 hover:bg-slate-50 transition-colors"
              >
                {/* Top Info Row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 leading-snug">
                      {exam.courseCode}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 line-clamp-1">
                      {exam.courseName}
                    </p>
                  </div>

                  <span
                    className={`${colors.badge} border px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0`}
                  >
                    {exam.daysLeft} day{exam.daysLeft !== 1 && "s"} left
                  </span>
                </div>

                {/* Readiness / Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center text-[10px] font-medium text-slate-400 mb-1">
                    <span>Preparation</span>
                    <span className="font-semibold text-slate-600">{exam.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`${colors.bar} h-full transition-all duration-500 rounded-full`}
                      style={{
                        width: `${Math.min(Math.max(exam.progress, 0), 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Exam Date Footer */}
                <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 font-medium">Exam Date</span>
                  <span className="font-semibold text-slate-600 flex items-center gap-1">
                    <CalendarIcon size={12} className="text-slate-400" />
                    {new Date(exam.examDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UpcomingExams;