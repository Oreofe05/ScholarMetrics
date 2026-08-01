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

  // Compact Donut Gauge Calculations
  const radius = 28;
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/80 p-4 flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <HeartPulse size={16} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">
              Academic Health
            </h2>
            <p className="text-slate-400 text-[10px]">
              Overall performance
            </p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-slate-500 transition">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Main Score Area - Tightened Row Layout */}
      <div className="mb-3 flex items-center justify-center gap-4 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100/80">
        
        {/* Donut Chart */}
        <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 70 70">
            <circle
              cx="35"
              cy="35"
              r={radius}
              className="text-slate-200"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="35"
              cy="35"
              r={radius}
              className="text-[#6C2BD9] transition-all duration-1000 ease-out"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-base font-extrabold text-slate-800">{score}%</span>
          </div>
        </div>

        {/* Status Badge & Label Immediately Beside Chart */}
        <div className="flex flex-col items-start gap-1">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${status.color}`}>
            {status.label}
          </span>
          <p className="text-[11px] font-medium text-slate-500 leading-tight">
            Overall Health Score
          </p>
        </div>

      </div>

      {/* Metrics Progress Bars */}
      <div className="space-y-2">
        {metrics.map((item) => (
          <div key={item.title} className="space-y-0.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-medium text-slate-600">{item.title}</span>
              <span className="font-bold text-slate-800">{item.value}%</span>
            </div>

            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-1.5 rounded-full transition-all duration-700"
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