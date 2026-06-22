import CourseUploader from "./CourseUploader";
import ExplainerChat from "./ExplainerChat";

export default function StudyLab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-6rem)]">
      
      {/* LEFT SIDE */}
      <div className="bg-slate-900 rounded-xl p-4 overflow-auto">
        <h2 className="text-lg font-bold mb-4 text-indigo-400">
          📚 Course Upload & Analysis
        </h2>

        <CourseUploader />
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-slate-900 rounded-xl p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4 text-indigo-400">
          🧠 AI Study Assistant
        </h2>

        <ExplainerChat />
      </div>
    </div>
  );
}