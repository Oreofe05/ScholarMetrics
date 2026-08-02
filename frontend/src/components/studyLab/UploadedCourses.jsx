import { useState } from "react";
import CourseCard from "./CourseCard";
import { BookMarked, FolderOpen, Search, X } from "lucide-react";

function UploadedCourses({
  uploadedCourses = [],
  calculateDaysRemaining,
  toggleChapterProgress,
  editingCourse,
  setEditingCourse,
  updateCourse,
  deleteCourse,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on code, title, or status search
  const filteredCourses = uploadedCourses.filter((course) => {
    const query = searchQuery.toLowerCase();
    const codeMatch = course.courseCode?.toLowerCase().includes(query);
    const titleMatch = course.courseName?.toLowerCase().includes(query);
    return codeMatch || titleMatch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Uploaded Courses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View all active course profiles, study breakdowns, and materials
          </p>
        </div>

        <div className="self-start sm:self-center inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-xl font-semibold text-xs tracking-wide">
          <BookMarked size={15} />
          <span>
            {uploadedCourses.length} {uploadedCourses.length === 1 ? "Course" : "Courses"}
          </span>
        </div>
      </div>

      {/* Search Input Bar (Visible when courses exist) */}
      {uploadedCourses.length > 0 && (
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search uploaded courses by code or title..."
            className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>
      )}

      {/* Main Content Area */}
      {uploadedCourses.length === 0 ? (
        <div className="text-center py-14 px-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center mx-auto mb-3">
            <FolderOpen size={22} className="text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">
            No Courses Added Yet
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Use the forms above to register a course and attach lecture files to start generating study schedules.
          </p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-10 px-4 border border-slate-100 rounded-2xl bg-slate-50/30">
          <p className="text-sm font-medium text-slate-700">
            No courses match &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              calculateDaysRemaining={calculateDaysRemaining}
              toggleChapterProgress={toggleChapterProgress}
              editingCourse={editingCourse}
              setEditingCourse={setEditingCourse}
              updateCourse={updateCourse}
              deleteCourse={deleteCourse}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default UploadedCourses;