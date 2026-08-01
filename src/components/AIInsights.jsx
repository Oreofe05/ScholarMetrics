import {
  Brain,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Info,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";

import { useApp } from "../context/AppContext";
import { generateInsights } from "../utils/generateInsights";

function AIInsights() {
  const {
    uploadedCourses,
    assignments,
    semesterGPA,
  } = useApp();

  const insights = generateInsights({
    uploadedCourses,
    assignments,
    cgpa: semesterGPA,
  });

  const getInsightStyle = (type) => {
    switch (type) {
      case "danger":
        return {
          icon: AlertTriangle,
          iconBg: "bg-rose-100/80 text-rose-600",
          cardBg: "bg-rose-50/40 border-rose-100",
          titleColor: "text-rose-950",
        };

      case "warning":
        return {
          icon: AlertTriangle,
          iconBg: "bg-amber-100/80 text-amber-600",
          cardBg: "bg-amber-50/40 border-amber-100",
          titleColor: "text-amber-950",
        };

      case "success":
        return {
          icon: TrendingUp,
          iconBg: "bg-emerald-100/80 text-emerald-600",
          cardBg: "bg-emerald-50/40 border-emerald-100",
          titleColor: "text-emerald-950",
        };

      case "info":
      default:
        return {
          icon: Sparkles,
          iconBg: "bg-purple-100/80 text-purple-600",
          cardBg: "bg-purple-50/40 border-purple-100",
          titleColor: "text-purple-950",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/80 p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Brain size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
              AI Insights
            </h2>
            <p className="text-slate-400 text-[11px]">
              Personalized recommendations
            </p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-slate-500 transition">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content Area */}
      {insights.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 my-auto">
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-2">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-700">All caught up!</p>
          <p className="text-[11px] text-slate-400 mt-0.5">No new AI recommendations at this time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {insights.map((item, index) => {
            const style = getInsightStyle(item.type);
            const Icon = style.icon;

            return (
              <div
                key={index}
                className={`border ${style.cardBg} rounded-xl p-3.5 transition-all duration-200 hover:shadow-xs`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon Badge */}
                  <div
                    className={`w-7 h-7 rounded-lg ${style.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                  >
                    <Icon size={15} />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-xs ${style.titleColor} leading-tight`}>
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AIInsights;