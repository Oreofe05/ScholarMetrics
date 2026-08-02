import { PlusCircle, BookOpen, Hash, Award } from "lucide-react";

function AddCourseForm({
  courseCode,
  setCourseCode,
  courseUnit,
  setCourseUnit,
  grade,
  setGrade,
  addCourse,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (addCourse) {
      addCourse();
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 sm:p-6 space-y-5">
      
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
          <PlusCircle size={20} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Add Course
          </h2>
          <p className="text-xs text-slate-500">
            Register a new course code, unit value, and grade
          </p>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Course Code Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <BookOpen size={14} className="text-slate-400" />
            Course Code
          </label>
          <input
            type="text"
            maxLength={10}
            placeholder="e.g. CSC101"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
            required
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>

        {/* Course Unit Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Hash size={14} className="text-slate-400" />
            Course Unit / Credit
          </label>
          <input
            type="number"
            min="1"
            max="6"
            placeholder="e.g. 3"
            value={courseUnit}
            onChange={(e) => setCourseUnit(e.target.value)}
            required
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>

        {/* Grade Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Award size={14} className="text-slate-400" />
            Grade Received
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl px-4 py-2.5 text-sm shadow-xs transition-all duration-150 cursor-pointer mt-2"
        >
          Add Course
        </button>

      </form>

    </div>
  );
}

export default AddCourseForm;