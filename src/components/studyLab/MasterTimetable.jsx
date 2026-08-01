import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Flame, 
  Layers, 
  Sparkles,
  CalendarX 
} from "lucide-react";

function MasterTimetable({ timetable = [] }) {
  const totalSessions = timetable.length;

  const totalHours = timetable.reduce(
    (sum, session) => sum + (session.estimatedHours || 0),
    0
  );

  const totalChapters = timetable.reduce(
    (sum, session) => sum + (session.chapters?.length || 0),
    0
  );

  const groupedTimetable = timetable.reduce((groups, session) => {
    if (!groups[session.date]) {
      groups[session.date] = [];
    }
    groups[session.date].push(session);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase mb-1">
            <Sparkles size={16} />
            <span>Automated Schedule</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI Study Timetable
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Personalized study timeline generated based on your registered course deadlines
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Sessions */}
        <div className="bg-indigo-50/60 border border-indigo-100/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Total Sessions
            </p>
            <h3 className="text-2xl font-extrabold text-indigo-900 mt-1">
              {totalSessions}
            </h3>
          </div>
          <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-lg">
            <Calendar size={20} />
          </div>
        </div>

        {/* Study Hours */}
        <div className="bg-emerald-50/60 border border-emerald-100/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Study Hours
            </p>
            <h3 className="text-2xl font-extrabold text-emerald-900 mt-1">
              {totalHours.toFixed(1)} <span className="text-xs font-semibold">hrs</span>
            </h3>
          </div>
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <Clock size={20} />
          </div>
        </div>

        {/* Chapters */}
        <div className="bg-purple-50/60 border border-purple-100/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
              Topics Covered
            </p>
            <h3 className="text-2xl font-extrabold text-purple-900 mt-1">
              {totalChapters}
            </h3>
          </div>
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-lg">
            <Layers size={20} />
          </div>
        </div>

      </div>

      {/* Timetable List Section */}
      {timetable.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center mx-auto mb-3">
            <CalendarX size={22} className="text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">
            No Timetable Generated
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Upload course materials and set exam dates to create an optimized daily reading schedule.
          </p>
        </div>
      ) : (
        <div className="space-y-8 pt-2">
          {Object.entries(groupedTimetable).map(([date, sessions]) => (
            <div key={date} className="space-y-4">
              
              {/* Date Section Banner */}
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 text-slate-800 font-bold text-sm sm:text-base">
                <Calendar size={18} className="text-indigo-600" />
                <span>{date}</span>
              </div>

              {/* Sessions Grid for this Date */}
              <div className="space-y-3">
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/70 rounded-xl p-4 transition-all duration-200 space-y-3"
                  >
                    
                    {/* Session Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-base">
                            {session.courseCode}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                            <Clock size={12} />
                            {session.time || "Scheduled"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {session.courseName}
                        </p>
                      </div>

                      {/* Exam Warning Badge */}
                      <div className="sm:text-right shrink-0">
                        <span className="text-xs font-semibold text-slate-700">
                          {session.estimatedHours ? session.estimatedHours.toFixed(1) : "0"} hrs
                        </span>
                        {session.examDate && (
                          <div className="flex items-center sm:justify-end gap-1 text-[11px] font-semibold text-rose-600 mt-0.5">
                            <Flame size={12} />
                            <span>Exam: {session.examDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Chapters/Topics Breakdown */}
                    {session.chapters && session.chapters.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/50">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Assigned Topics
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {session.chapters.map((chapter) => (
                            <div
                              key={chapter.chapterNumber || chapter.title}
                              className="inline-flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-lg px-2.5 py-1 text-xs text-slate-700 shadow-2xs"
                            >
                              <BookOpen size={13} className="text-indigo-500 shrink-0" />
                              <span className="font-medium">{chapter.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default MasterTimetable;