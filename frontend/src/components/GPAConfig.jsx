import { SlidersHorizontal } from "lucide-react";

function GPAConfig({ scale, setScale }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 sm:p-6 space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
          <SlidersHorizontal size={20} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            GPA Configuration
          </h2>
          <p className="text-xs text-slate-500">
            Select the grading scale used by your institution
          </p>
        </div>
      </div>

      {/* Selector Container */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">
          Grading Scale Standard
        </label>
        
        <select
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer"
        >
          <option value={5}>5.0 Point Scale (e.g., A = 5.0)</option>
          <option value={4}>4.0 Point Scale (e.g., A = 4.0)</option>
        </select>
        
        <p className="text-[11px] text-slate-400 mt-1">
          Adjusting this scale will automatically update grade point weights for all calculated metrics.
        </p>
      </div>

    </div>
  );
}

export default GPAConfig;