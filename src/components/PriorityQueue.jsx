import {
  Flame,
  ArrowRight,
  MoreHorizontal,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../context/AppContext";
import { generatePriorityQueue } from "../utils/generatePriorityQueue";

function PriorityQueue() {
  const { uploadedCourses } = useApp();

  const priorities = generatePriorityQueue(uploadedCourses);

  const navigate = useNavigate();

  const openCourse = (courseCode) => {
    navigate("/study-lab", {
      state: {
        selectedCourse: courseCode,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/80 p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
            <Flame size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
              Priority Queue
            </h2>
            <p className="text-slate-400 text-[11px]">
              What deserves your attention first
            </p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-slate-500 transition">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      {priorities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 my-auto">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center mb-2">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-700">No Priorities Pending</p>
          <p className="text-[11px] text-slate-400 mt-0.5 max-w-[200px]">
            Upload course materials to generate your study priorities.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {priorities.map((item) => {
            let level = "Low";

            if (item.priority >= 80) {
              level = "High";
            } else if (item.priority >= 50) {
              level = "Medium";
            }

            const badgeStyle =
              level === "High"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : level === "Medium"
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : "bg-emerald-50 text-emerald-700 border-emerald-100";

            return (
              <button
                key={item.courseCode}
                onClick={() => openCourse(item.courseCode)}
                className="
                  group
                  w-full
                  text-left
                  bg-slate-50/40
                  border
                  border-slate-100
                  rounded-xl
                  p-3.5
                  hover:bg-slate-50
                  hover:border-slate-200
                  transition-all
                  duration-200
                  cursor-pointer
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-800">
                        {item.courseCode}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeStyle}`}
                      >
                        {level} Priority
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs font-medium mt-1">
                      Study {item.remaining} chapter
                      {item.remaining !== 1 ? "s" : ""}
                    </p>

                    {/* Meta Info Tags */}
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        Exam in {item.daysRemaining} day
                        {item.daysRemaining !== 1 ? "s" : ""}
                      </span>
                      <span>•</span>
                      <span>
                        Readiness:{" "}
                        <strong className="text-slate-600 font-semibold">
                          {item.readiness}%
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Arrow Action Indicator */}
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-purple-600 group-hover:border-purple-100 group-hover:bg-purple-50 transition-all flex-shrink-0">
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PriorityQueue;