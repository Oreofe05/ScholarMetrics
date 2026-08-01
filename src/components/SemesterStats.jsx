import { TrendingUp, TrendingDown, Award, Star } from "lucide-react";

function SemesterStats({
  highestScore,
  lowestScore,
  totalQualityPoints,
  numberOfA,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      
      {/* Highest Score */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
          <TrendingUp size={22} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Highest Score
          </p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {highestScore !== undefined && highestScore !== null ? highestScore : "--"}
          </p>
        </div>
      </div>

      {/* Lowest Score */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl w-fit">
          <TrendingDown size={22} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Lowest Score
          </p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {lowestScore !== undefined && lowestScore !== null ? lowestScore : "--"}
          </p>
        </div>
      </div>

      {/* Total Quality Points */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
          <Award size={22} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Quality Points
          </p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalQualityPoints !== undefined && totalQualityPoints !== null
              ? typeof totalQualityPoints === "number"
                ? totalQualityPoints.toFixed(1)
                : totalQualityPoints
              : "0.0"}
          </p>
        </div>
      </div>

      {/* A Grades Count */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
          <Star size={22} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            A Grades
          </p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {numberOfA ?? 0}
          </p>
        </div>
      </div>

    </div>
  );
}

export default SemesterStats;