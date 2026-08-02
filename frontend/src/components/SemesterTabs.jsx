import { Plus, Trash2, Pencil, Check } from "lucide-react";

function SemesterTabs({
  semesters = [],
  activeSemester,
  setActiveSemester,
  editingSemester,
  setEditingSemester,
  renameSemester,
  deleteSemester,
  addSemester,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setEditingSemester(null);
    }
  };

  return (
    <div className="space-y-2">
      {/* Tab Navigation Wrapper */}
      <div className="flex items-center gap-2 flex-wrap bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/60">
        {semesters.map((sem, index) => {
          const isActive = activeSemester === sem.id;
          const isEditing = editingSemester === sem.id;
          const tabLabel = sem.customName || `Semester ${index + 1}`;

          return (
            <div
              key={sem.id}
              className={`group flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all duration-150 ${
                isActive
                  ? "bg-white text-indigo-600 shadow-xs border border-slate-200/80 font-bold"
                  : "bg-transparent text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 font-medium"
              }`}
            >
              {isEditing ? (
                /* Inline Rename Input */
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={sem.customName || ""}
                    placeholder={`Semester ${index + 1}`}
                    autoFocus
                    onChange={(e) => renameSemester(sem.id, e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setEditingSemester(null)}
                    className="bg-slate-50 border border-indigo-400 rounded-lg px-2 py-0.5 text-xs text-slate-800 font-medium outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    onClick={() => setEditingSemester(null)}
                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    title="Save Name"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                /* Tab Select Button */
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveSemester(sem.id)}
                    onDoubleClick={() => setEditingSemester(sem.id)}
                    className="text-xs sm:text-sm tracking-tight outline-none cursor-pointer select-none"
                    title="Double-click to rename"
                  >
                    {tabLabel}
                  </button>

                  {/* Edit Icon Trigger */}
                  <button
                    onClick={() => setEditingSemester(sem.id)}
                    className={`p-1 rounded-md transition-opacity cursor-pointer ${
                      isActive
                        ? "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                        : "opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700"
                    }`}
                    title="Rename Semester"
                  >
                    <Pencil size={12} />
                  </button>

                  {/* Delete Button (Only if more than 1 semester exists) */}
                  {semesters.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSemester(sem.id);
                      }}
                      className={`p-1 rounded-md transition-opacity cursor-pointer ${
                        isActive
                          ? "text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          : "opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600"
                      }`}
                      title="Delete Semester"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add Semester Button */}
        <button
          onClick={addSemester}
          className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs rounded-xl px-3 py-2 shadow-2xs transition-all duration-150 cursor-pointer ml-auto sm:ml-1"
        >
          <Plus size={14} />
          <span>Add Semester</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-400 px-1">
        Tip: Double-click any tab to quickly rename it.
      </p>
    </div>
  );
}

export default SemesterTabs;