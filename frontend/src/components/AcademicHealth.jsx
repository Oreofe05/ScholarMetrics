import { HeartPulse, MoreHorizontal } from "lucide-react";
import { calculateAcademicHealth } from "../utils/calculateAcademicHealth";
import { useApp } from "../context/AppContext";

function AcademicHealth() {
  const {
    uploadedCourses,
    assignments = [],
    cgpa = 0,
  } = useApp();

  const health = calculateAcademicHealth({
    courses: uploadedCourses,
    assignments,
    cgpa,
  });

  const metrics = [
    { title: "Study Progress", value: health.studyProgress },
    { title: "Exam Readiness", value: health.readiness },
    { title: "Assignments", value: health.assignmentCompletion },
    { title: "CGPA", value: health.cgpaScore },
    { title: "Consistency", value: health.consistency },
  ];

  const score = health.overall;

  // Expanded Donut Gauge Calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getStatusConfig = (val) => {
    if (val >= 80) return { label: "Excellent", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
    if (val >= 60) return { label: "Good", color: "text-blue-600 bg-blue-50 border-blue-100" };
    if (val >= 40) return { label: "Needs Work", color: "text-amber-600 bg-amber-50 border-amber-100" };
    return { label: "Critical", color: "text-rose-600 bg-rose-50 border-rose-100" };
  };

  const status = getStatusConfig(score);

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 flex flex-col justify-between space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <HeartPulse size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
              Academic Health
            </h2>
            <p className="text-slate-400 text-[11px]">
              Overall performance metric
            </p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-slate-500 transition cursor-pointer p-1">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Main Hero Score Area - Expanded Donut Chart */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
        
        {/* Enlarged Donut Chart */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-slate-200/80"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-[#6C2BD9] transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center Text Readout */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              {score}%
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Score
            </span>
          </div>
        </div>

        {/* Status Badge & Descriptor */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${status.color}`}>
            {status.label}
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-slate-800 leading-snug">
              Overall Status
            </p>
            <p className="text-[11px] font-medium text-slate-400 max-w-[130px] leading-tight">
              Calculated across all courses, CGPA & progress metrics
            </p>
          </div>
        </div>

      </div>

      {/* Metrics Progress Bars */}
      <div className="space-y-2.5 pt-1">
        {metrics.map((item) => (
          <div key={item.title} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-600">{item.title}</span>
              <span className="font-bold text-slate-900">{item.value}%</span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(Math.max(item.value, 0), 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AcademicHealth;