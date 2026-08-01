import {
  Calculator,
  ClipboardList,
  BookOpen,
  Brain,
  Zap,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add CGPA Course",
      description: "Manage semester courses",
      icon: Calculator,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      route: "/cgpa",
    },
    {
      title: "New Assignment",
      description: "Track assignments",
      icon: ClipboardList,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      route: "/assignments",
    },
    {
      title: "Study Lab",
      description: "Upload course materials",
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      route: "/study-lab",
    },
    {
      title: "AI Assistant",
      description: "Ask for study help",
      icon: Brain,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      route: "/study-lab",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/80 p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Zap size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
              Quick Actions
            </h2>
            <p className="text-slate-400 text-[11px]">
              Jump to important sections
            </p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-slate-500 transition">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.route)}
              className="
                group
                flex
                items-center
                justify-between
                bg-slate-50/40
                border
                border-slate-100
                rounded-xl
                p-3.5
                hover:bg-slate-50
                hover:border-slate-200
                hover:shadow-xs
                transition-all
                duration-200
                text-left
                cursor-pointer
              "
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${action.color}`}
                >
                  <Icon size={18} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-xs text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors truncate">
                    {action.title}
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-0.5 truncate">
                    {action.description}
                  </p>
                </div>
              </div>

              <div className="w-6 h-6 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all flex-shrink-0 ml-2">
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;