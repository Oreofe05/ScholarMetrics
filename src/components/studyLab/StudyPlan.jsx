import { Calendar, BookOpen, Clock, Sparkles, CalendarX } from "lucide-react";

function StudyPlan({ studyPlan = [] }) {
  if (!studyPlan || studyPlan.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center mt-6">
        <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-2">
          <CalendarX size={18} className="text-slate-400" />
        </div>
        <h4 className="font-semibold text-slate-800 text-sm">No Study Plan Available</h4>
        <p className="text-xs text-slate-500 mt-1">
          Upload course materials and syllabus data to auto-generate a structured day-by-day plan.
        </p>
      </div>
    );
  }

  // Helper function to return dynamic badge colors based on session type
  const getTypeBadgeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "study":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "review":
      case "revision":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "practice":
      case "quiz":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "rest":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 sm:p-6 space-y-5 mt-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
              AI Study Plan
            </h4>
            <p className="text-xs text-slate-500">
              Recommended daily breakdown and session structure
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {studyPlan.length} Day(s)
        </span>
      </div>

      {/* Schedule Session Cards */}
      <div className="space-y-3">
        {studyPlan.map((session, index) => {
          const hours = session.estimatedHours || 0;
          const isStudyType = session.type === "Study";

          return (
            <div
              key={index}
              className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-all duration-150 space-y-2.5"
            >
              {/* Card Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Day {session.day}
                  </span>
                </div>

                <span
                  className={`text-xs font-semibold border px-2.5 py-0.5 rounded-full capitalize ${getTypeBadgeColor(
                    session.type
                  )}`}
                >
                  {session.type}
                </span>
              </div>

              {/* Main Topic / Chapter */}
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                {session.chapter}
              </p>

              {/* Metadata Row: Pages & Hours */}
              <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                {isStudyType && session.startPage && session.endPage ? (
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <BookOpen size={14} className="text-slate-400" />
                    <span>
                      Pages <span className="font-medium text-slate-800">{session.startPage}</span> –{" "}
                      <span className="font-medium text-slate-800">{session.endPage}</span>
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-400 italic">Self-guided session</span>
                )}

                <div className="flex items-center gap-1 text-emerald-600 font-semibold ml-auto">
                  <Clock size={13} />
                  <span>
                    {hours} {hours === 1 ? "hr" : "hrs"}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default StudyPlan;