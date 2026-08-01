import { TrendingUp, MoreHorizontal, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { generateWeeklyProgress } from "../utils/generateWeeklyProgress";

function WeeklyProgress() {
  const { uploadedCourses } = useApp();

  const progress = generateWeeklyProgress(uploadedCourses);

  const maxHours = Math.max(
    ...progress.dailyProgress.map((day) => day.hours),
    1
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/80 p-5 flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
              Weekly Study Progress
            </h2>
            <p className="text-slate-400 text-[11px]">
              Your learning consistency this week
            </p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-slate-500 transition">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Modern Mini Stat Chips */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {/* Weekly Hours */}
        <div className="bg-slate-50/70 border border-slate-100 p-2.5 rounded-xl flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-100/70 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Clock size={14} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Hours</p>
            <h3 className="text-sm font-bold text-slate-800 leading-tight">
              {progress.weeklyHours} hrs
            </h3>
          </div>
        </div>

        {/* Chapters Done */}
        <div className="bg-slate-50/70 border border-slate-100 p-2.5 rounded-xl flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <BookOpen size={14} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Chapters</p>
            <h3 className="text-sm font-bold text-slate-800 leading-tight">
              {progress.completedChapters}
            </h3>
          </div>
        </div>

        {/* Completion */}
        <div className="bg-slate-50/70 border border-slate-100 p-2.5 rounded-xl flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-100/70 text-amber-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={14} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Progress</p>
            <h3 className="text-sm font-bold text-slate-800 leading-tight">
              {progress.completion}%
            </h3>
          </div>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="pt-2">
        <div className="flex items-end justify-between h-40 gap-2 px-1">
          {progress.dailyProgress.map((item) => {
            const heightPercentage = Math.round((item.hours / maxHours) * 100);

            return (
              <div
                key={item.day}
                className="group relative flex flex-col items-center flex-1 h-full justify-end"
              >
                {/* Hover Tooltip */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] font-bold py-0.5 px-2 rounded pointer-events-none z-10 whitespace-nowrap">
                  {item.hours} hrs
                </div>

                {/* Bar Track & Fill */}
                <div className="w-full max-w-[28px] bg-slate-100 rounded-t-lg h-full flex items-end overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all duration-700 ease-out group-hover:from-indigo-500 group-hover:to-purple-400"
                    style={{
                      height: `${heightPercentage}%`,
                      minHeight: item.hours > 0 ? "10%" : "0%",
                    }}
                  />
                </div>

                {/* Day Label & Hours */}
                <div className="text-center mt-2 space-y-0.5">
                  <span className="block text-[11px] font-semibold text-slate-600">
                    {item.day}
                  </span>
                  <span className="block text-[9px] font-medium text-slate-400">
                    {item.hours}h
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default WeeklyProgress;