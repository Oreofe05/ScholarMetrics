import { generateStudyOverview } from "../../utils/generateStudyOverview";
import { 
  BrainCircuit, 
  BookOpen, 
  Clock, 
  Flame, 
  AlertCircle,
  Lightbulb
} from "lucide-react";

function StudyOverview({ uploadedCourses }) {
  const overview = generateStudyOverview(uploadedCourses);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase mb-1">
            <BrainCircuit size={16} />
            <span>Smart Analytics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI Study Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time workload metrics and prioritized recommendations
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Courses */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-sky-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Courses</span>
            <BookOpen size={16} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-sky-900">
            {overview.totalCourses ?? 0}
          </h3>
        </div>

        {/* Chapters Left */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Chapters Left</span>
            <Flame size={16} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-emerald-900">
            {overview.totalChapters ?? 0}
          </h3>
        </div>

        {/* Hours Remaining */}
        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Hours Left</span>
            <Clock size={16} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-indigo-900">
            {overview.totalHours ? overview.totalHours.toFixed(1) : "0.0"}
          </h3>
        </div>

        {/* Nearest Exam */}
        <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Nearest Exam</span>
            <AlertCircle size={16} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-900 truncate">
              {overview.nearestCourse ? overview.nearestCourse.courseCode : "--"}
            </h3>
            <p className="text-xs font-medium text-rose-600 mt-0.5">
              {overview.nearestCourse ? `${overview.nearestDays} day(s) away` : "No upcoming exams"}
            </p>
          </div>
        </div>

      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-100/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-2xs shrink-0 mt-0.5">
          <Lightbulb size={18} />
        </div>

        <div className="space-y-1 text-xs sm:text-sm">
          <h4 className="font-semibold text-slate-900">
            AI Priority Recommendation
          </h4>

          {overview.nearestCourse ? (
            <>
              <p className="text-slate-700 leading-relaxed">
                Focus on <span className="font-semibold text-indigo-900">{overview.nearestCourse.courseCode}</span> first—it is your closest deadline.
              </p>
              <p className="text-slate-500 text-xs pt-1">
                Tip: Pace yourself by reviewing remaining chapters daily and testing your retention with flashcards before each session.
              </p>
            </>
          ) : (
            <p className="text-slate-500">
              Upload your course materials and set exam dates to receive tailored study prioritization insights.
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

export default StudyOverview;