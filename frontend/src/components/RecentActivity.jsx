import {
  Upload,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  History,
  MoreHorizontal,
  Clock,
} from "lucide-react";

import { useApp } from "../context/AppContext";
import { generateRecentActivity } from "../utils/generateRecentActivity";

function RecentActivity() {
  const {
    uploadedCourses,
    assignments,
    courses,
    cgpa,
  } = useApp();

  const activities = generateRecentActivity({
    uploadedCourses,
    assignments,
    courses,
    cgpa,
  });

  const getActivityConfig = (type) => {
    switch (type) {
      case "upload":
        return {
          icon: <Upload size={14} className="text-indigo-600" />,
          bg: "bg-indigo-50 border-indigo-100",
        };

      case "assignment":
      case "completed":
        return {
          icon: <ClipboardCheck size={14} className="text-emerald-600" />,
          bg: "bg-emerald-50 border-emerald-100",
        };

      case "course":
        return {
          icon: <BookOpen size={14} className="text-sky-600" />,
          bg: "bg-sky-50 border-sky-100",
        };

      default:
        return {
          icon: <GraduationCap size={14} className="text-purple-600" />,
          bg: "bg-purple-50 border-purple-100",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/80 p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <History size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
              Recent Activity
            </h2>
            <p className="text-slate-400 text-[11px]">
              Latest actions across your dashboard
            </p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-slate-500 transition">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content Stream */}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 my-auto">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
            <Clock size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-700">No Activity Yet</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Your recent interactions will appear here.</p>
        </div>
      ) : (
        <div className="relative pl-3 pr-1 py-1 space-y-4">
          {/* Vertical Timeline Track */}
          <div className="absolute left-[19px] top-3 bottom-3 w-[2px] bg-slate-100 -z-0" />

          {activities.slice(0, 8).map((activity, index) => {
            const config = getActivityConfig(activity.type);

            return (
              <div key={index} className="relative flex items-start gap-3.5 z-10">
                {/* Timeline Node Badge */}
                <div
                  className={`w-7 h-7 rounded-full border ${config.bg} flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5 bg-white`}
                >
                  {config.icon}
                </div>

                {/* Info Container */}
                <div className="flex-1 min-w-0 bg-slate-50/40 p-2.5 rounded-xl border border-slate-100/80">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-xs text-slate-800 truncate">
                      {activity.title}
                    </h3>
                    <span className="text-[10px] font-medium text-slate-400 flex-shrink-0">
                      {new Date(activity.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {activity.description && (
                    <p className="text-slate-500 text-[11px] mt-0.5 leading-snug line-clamp-2">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;