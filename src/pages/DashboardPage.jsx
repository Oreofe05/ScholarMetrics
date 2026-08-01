import AcademicHealth from "../components/AcademicHealth";
import PriorityQueue from "../components/PriorityQueue";
import WeeklyProgress from "../components/WeeklyProgress";
import AIInsights from "../components/AIInsights";
import UpcomingExams from "../components/UpcomingExams";
import RecentActivity from "../components/RecentActivity";
import QuickActions from "../components/QuickActions";
import { 
  Flame, 
  Calendar, 
  Clock, 
  Award, 
  MoreHorizontal,
  Sparkles
} from "lucide-react";

function Dashboard({
  uploadedCourses,
  assignments,
  cgpa,
}) {
  const student = {
    name: "Ore",
    department: "Computer Science",
    level: "Final Year Student",
  };

  return (
    <div className="space-y-6 bg-[#F8F9FD] min-h-screen p-2 md:p-4">

      {/* HEADER GREETING BANNER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            {student.department} • {student.level}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2">
            Welcome back, {student.name} 👋
          </h1>
        </div>
        
        {/* Today's Focus Pill */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center gap-3 self-start sm:self-auto">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today's Focus</p>
            <p className="text-xs font-semibold text-slate-700">CSC293 Chapter 5</p>
          </div>
        </div>
      </div>

      {/* TOP METRICS / STAT CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Study Health */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Award size={22} />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-slate-800">87%</h3>
                <span className="text-xs text-emerald-600 font-semibold">Excellent</span>
              </div>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Study Health</p>
            </div>
          </div>
          <button className="text-slate-300 hover:text-slate-500 self-start">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Card 2: Next Exam */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Calendar size={22} />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-slate-800">8 Days</h3>
              </div>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Next Exam (CSC293)</p>
            </div>
          </div>
          <button className="text-slate-300 hover:text-slate-500 self-start">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Card 3: Today's Goal */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">4 hrs</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Today's Target</p>
            </div>
          </div>
          <button className="text-slate-300 hover:text-slate-500 self-start">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Card 4: Daily Streak */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Flame size={22} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">5 Days</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Current Streak</p>
            </div>
          </div>
          <button className="text-slate-300 hover:text-slate-500 self-start">
            <MoreHorizontal size={18} />
          </button>
        </div>

      </div>

      {/* DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyProgress />
        <AIInsights />
        <AcademicHealth
          uploadedCourses={uploadedCourses}
          assignments={assignments}
          cgpa={cgpa}
        />
        <UpcomingExams />
        <PriorityQueue />
        <RecentActivity />
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;