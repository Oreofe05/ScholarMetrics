import { calculateProgress } from "../../utils/progressUtils";
import { TrendingUp, CheckCircle2, Circle, BookOpen } from "lucide-react";

function ProgressTracker({ report, onToggle }) {
  const progress = report?.progress || [];
  const percentage = calculateProgress(progress) || 0;

  const completedCount = progress.filter((ch) => ch.completed).length;
  const totalCount = progress.length;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 sm:p-6 space-y-5 mt-6">
      
      {/* Header & Percentage Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
              Study Progress
            </h4>
            <p className="text-xs text-slate-500">
              Track chapter completion for this course
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-lg font-extrabold text-emerald-600">
            {percentage}%
          </span>
          <p className="text-[11px] font-medium text-slate-400">
            {completedCount} of {totalCount} completed
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Chapters Checklist */}
      {totalCount === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <BookOpen size={20} className="text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs text-slate-500">No chapters found for this course material.</p>
        </div>
      ) : (
        <div className="space-y-2 pt-2">
          {progress.map((chapter, index) => {
            const isCompleted = chapter.completed;

            return (
              <label
                key={index}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isCompleted
                    ? "bg-emerald-50/40 border-emerald-200/60 text-slate-700"
                    : "bg-slate-50/50 hover:bg-slate-50 border-slate-200/80 text-slate-800"
                }`}
              >
                {/* Custom Styled Checkbox Input */}
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => onToggle(index)}
                  className="sr-only"
                />

                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : (
                    <Circle size={18} className="text-slate-300 hover:text-slate-400 transition-colors" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    className={`text-xs sm:text-sm font-medium leading-tight block ${
                      isCompleted ? "line-through text-slate-400" : "text-slate-800"
                    }`}
                  >
                    {chapter.title || `Chapter ${index + 1}`}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default ProgressTracker;