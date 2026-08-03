import React from "react";
import { Plus, BookOpen, Tag, Calendar } from "lucide-react";

function AddCourse({
  courseCode,
  setCourseCode,
  courseName,
  setCourseName,
  examDate,
  setExamDate,
  addCourse,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (addCourse) {
      addCourse();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-5 sm:p-6 text-slate-900 mt-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
        <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl shrink-0 border border-indigo-100">
          <BookOpen size={20} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            Add New Course
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Enter course details to calculate study timeline and schedules
          </p>
        </div>
      </div>

      {/* Form Fields Stacked in Rows */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Field 1: Course Code */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Tag size={14} className="text-slate-400" />
              Course Code
            </label>
            <input
              type="text"
              placeholder="e.g. CSC 401"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full border border-slate-300 bg-slate-50/50 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
              required
            />
          </div>

          {/* Field 2: Exam Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full border border-slate-300 bg-slate-50/50 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Field 3: Course Name (Full Row on Small/Medium screens) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <BookOpen size={14} className="text-slate-400" />
            Course Name
          </label>
          <input
            type="text"
            placeholder="e.g. Advanced Software Engineering & Architecture"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full border border-slate-300 bg-slate-50/50 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
            required
          />
        </div>

        {/* Submit Action Row */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-[0.99]"
          >
            <Plus size={18} />
            <span>Add Course</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;