import {
  BookOpen,
  Clock,
  Sparkles,
  CalendarX,
} from "lucide-react";

function StudyPlan({ studyPlan }) {
  // Safe normalization of incoming data
  let plan = [];

  if (Array.isArray(studyPlan)) {
    plan = studyPlan;
  } else if (studyPlan?.plan) {
    try {
      plan =
        typeof studyPlan.plan === "string"
          ? JSON.parse(studyPlan.plan)
          : studyPlan.plan;
    } catch (error) {
      console.error("Invalid study plan JSON format:", error);
      plan = [];
    }
  }

  // Ensure plan remains an array
  if (!Array.isArray(plan)) {
    plan = [];
  }

  // Badge Color Helper
  const getTypeBadgeColor = (type) => {
    switch ((type || "").toLowerCase()) {
      case "study":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "review":
      case "revision":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "practice":
      case "quiz":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rest":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-6 mt-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-tight">
              AI Study Plan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Personalized study schedule
            </p>
          </div>
        </div>

        <span className="self-start sm:self-center text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold border border-slate-200">
          {plan.length} {plan.length === 1 ? "Day" : "Days"}
        </span>
      </div>

      {/* AI Plan Exists */}
      {plan.length > 0 ? (
        <div className="space-y-4 mt-6">
          {plan.map((session, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl bg-slate-50/50 p-4 transition-all hover:border-slate-300"
            >
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  Day {session.day || index + 1}
                </h4>

                {session.type && (
                  <span
                    className={`text-xs border px-2.5 py-0.5 rounded-full font-medium ${getTypeBadgeColor(
                      session.type
                    )}`}
                  >
                    {session.type}
                  </span>
                )}
              </div>

              <p className="font-medium text-slate-800 text-sm sm:text-base leading-snug">
                {session.chapter || session.topic || "Untitled Session"}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-200/60 text-xs sm:text-sm text-slate-600">
                {session.startPage && session.endPage ? (
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <BookOpen size={16} className="shrink-0 text-slate-400" />
                    <span>
                      Pages <strong className="text-slate-800">{session.startPage}</strong> - <strong className="text-slate-800">{session.endPage}</strong>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <BookOpen size={16} className="shrink-0 text-slate-400" />
                    <span>General Revision</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold self-start sm:self-auto">
                  <Clock size={16} className="shrink-0 text-emerald-600" />
                  <span>{session.estimatedHours || 0} hrs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Manual / Fallback Plan */
        <div className="mt-6">
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <CalendarX size={20} className="text-slate-400" />
            </div>

            <h4 className="font-semibold text-slate-800 text-base">
              AI Study Plan Not Available
            </h4>

            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't generate an automated schedule. You can follow this standard template instead.
            </p>
          </div>

          <div className="mt-4 bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 sm:p-5">
            <h5 className="font-semibold text-indigo-900 text-sm sm:text-base mb-3">
              Recommended Study Schedule
            </h5>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3.5 border border-indigo-100/80 shadow-xs">
                <h6 className="font-bold text-slate-900 text-xs sm:text-sm">Day 1</h6>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Read Chapters 1–2 carefully and take key notes.
                </p>
              </div>

              <div className="bg-white rounded-lg p-3.5 border border-indigo-100/80 shadow-xs">
                <h6 className="font-bold text-slate-900 text-xs sm:text-sm">Day 2</h6>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Continue with the next chapters and summarize core concepts.
                </p>
              </div>

              <div className="bg-white rounded-lg p-3.5 border border-indigo-100/80 shadow-xs">
                <h6 className="font-bold text-slate-900 text-xs sm:text-sm">Day 3</h6>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Revise previous chapters and solve practice problems.
                </p>
              </div>

              <div className="bg-white rounded-lg p-3.5 border border-indigo-100/80 shadow-xs">
                <h6 className="font-bold text-slate-900 text-xs sm:text-sm">Final Week</h6>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Focus on flashcards, high-yield summaries, and mock quizzes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyPlan;