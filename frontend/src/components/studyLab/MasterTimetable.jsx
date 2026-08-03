import {
  Calendar,
  Clock,
  BookOpen,
  Flame,
  Layers,
  Sparkles,
  CalendarX,
} from "lucide-react";

function MasterTimetable({ uploadedCourses = [] }) {
  // Build timetable from uploaded courses
  
  const timetable = [];

  uploadedCourses.forEach((course) => {
    console.log("COURSE:", course);

    (course.materials || []).forEach((material) => {
      console.log("MATERIAL:", material);

      console.log("STUDY PLAN:", material.studyPlan);

      console.log("PLAN:", material.studyPlan?.plan);

      console.log("TYPE:", typeof material.studyPlan?.plan);

      console.log("IS ARRAY:", Array.isArray(material.studyPlan?.plan));
    });
  });
  console.log(uploadedCourses);
  const totalSessions = timetable.length;

  const totalHours = timetable.reduce(
    (sum, session) => sum + Number(session.estimatedHours || 0),
    0
  );

  const totalChapters = timetable.reduce((sum, session) => {
    if (Array.isArray(session.chapters)) {
      return sum + session.chapters.length;
    }

    if (session.chapter) {
      return sum + 1;
    }

    return sum;
  }, 0);
  
  const sortedTimetable = [...timetable].sort(
    (a, b) => (a.day || 0) - (b.day || 0)
  );

  const groupedTimetable = sortedTimetable.reduce((groups, session) => {
    const key = `Day ${session.day || 1}`;

    if (!groups[key]) groups[key] = [];

    groups[key].push(session);

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

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            AI Study Timetable
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Combined study schedule from all uploaded courses.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex justify-between">
          <div>
            <p className="text-xs uppercase font-semibold text-indigo-600">
              Total Sessions
            </p>

            <h3 className="text-2xl font-bold text-indigo-900">
              {totalSessions}
            </h3>
          </div>

          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
            <Calendar size={20} />
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex justify-between">
          <div>
            <p className="text-xs uppercase font-semibold text-emerald-600">
              Study Hours
            </p>

            <h3 className="text-2xl font-bold text-emerald-900">
              {totalHours.toFixed(1)} hrs
            </h3>
          </div>

          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex justify-between">
          <div>
            <p className="text-xs uppercase font-semibold text-purple-600">
              Topics
            </p>

            <h3 className="text-2xl font-bold text-purple-900">
              {totalChapters}
            </h3>
          </div>

          <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
            <Layers size={20} />
          </div>
        </div>

      </div>

      {timetable.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <CalendarX className="mx-auto text-slate-400 mb-3" size={24} />

          <h3 className="font-semibold">
            No Timetable Generated
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Upload course materials to generate a study schedule.
          </p>
        </div>
      ) : (
        <div className="space-y-8">

          {Object.entries(groupedTimetable).map(([day, sessions]) => (

            <div key={day}>

              <div className="flex items-center gap-2 border-b pb-2 mb-4">
                <Calendar size={18} className="text-indigo-600" />
                <span className="font-bold">{day}</span>
              </div>

              <div className="space-y-3">

                {sessions.map((session, index) => (

                  <div
                    key={index}
                    className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3"
                  >

                    <div className="flex justify-between">

                      <div>

                        <div className="flex gap-2 items-center">

                          <span className="font-bold">
                            {session.courseCode}
                          </span>

                          <span className="text-xs bg-white border rounded px-2 py-1">
                            {session.time || "Study Session"}
                          </span>

                        </div>

                        <p className="text-xs text-slate-500">
                          {session.courseName}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-xs font-semibold">
                          {session.estimatedHours || 0} hrs
                        </p>

                        {session.examDate && (
                          <div className="flex items-center justify-end gap-1 text-rose-600 text-xs mt-1">
                            <Flame size={12} />
                            {new Date(session.examDate).toLocaleDateString()}
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Topic */}

                    <div className="border-t pt-3">

                      <p className="text-xs uppercase text-slate-400 mb-2">
                        Assigned Topic
                      </p>

                      {session.chapter ? (
                        <div className="inline-flex items-center gap-2 bg-white border rounded-lg px-3 py-2 text-sm">
                          <BookOpen size={14} className="text-indigo-500" />
                          {session.chapter}
                        </div>
                      ) : Array.isArray(session.chapters) &&
                        session.chapters.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {session.chapters.map((chapter, i) => (
                            <div
                              key={i}
                              className="inline-flex items-center gap-2 bg-white border rounded-lg px-3 py-2 text-sm"
                            >
                              <BookOpen
                                size={14}
                                className="text-indigo-500"
                              />
                              {chapter.title}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">
                          No topic assigned.
                        </p>
                      )}

                    </div>

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