import { useState, useEffect, useCallback } from "react";
import generateFlashcards from "../../utils/generateFlashcards";
import { 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Eye, 
  EyeOff,
  Sparkles 
} from "lucide-react";

function Flashcards({ report }) {
  const flashcards = generateFlashcards(report);

  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const totalCards = flashcards.length;
  const progressPercentage = totalCards > 0 ? ((current + 1) / totalCards) * 100 : 0;

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (current < totalCards - 1) {
      setCurrent((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [current, totalCards]);

  const handlePrev = useCallback(() => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [current]);

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  // Keyboard Navigation for an uninterrupted study session
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (totalCards === 0) return;

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleFlip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, totalCards]);

  if (totalCards === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center mt-6">
        <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-2">
          <Layers size={18} className="text-slate-400" />
        </div>
        <h4 className="font-semibold text-slate-800 text-sm">No Flashcards Available</h4>
        <p className="text-xs text-slate-500 mt-1">
          Upload course materials with key concepts or term definitions to auto-generate study flashcards.
        </p>
      </div>
    );
  }

  const card = flashcards[current];

  return (
    <div className="mt-8 space-y-4">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 tracking-tight">
              Interactive Flashcards
            </h4>
            <p className="text-xs text-slate-500">
              Click the card or press Space to flip • Use ← → keys to navigate
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          Card {current + 1} of {totalCards}
        </span>
      </div>

      {/* Card Wrapper Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden p-5 sm:p-6 space-y-6">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* 3D Flip Card Container */}
        <div
          onClick={toggleFlip}
          tabIndex={0}
          role="button"
          aria-label="Toggle Flashcard Answer"
          className="relative w-full min-h-[220px] sm:min-h-[260px] cursor-pointer group perspective-1000 focus:outline-none"
        >
          <div
            className={`w-full h-full min-h-[220px] sm:min-h-[260px] rounded-xl border p-6 flex flex-col justify-between transition-all duration-500 transform-style-3d ${
              isFlipped
                ? "bg-slate-900 border-slate-800 text-white shadow-md rotate-y-180"
                : "bg-slate-50/80 border-slate-200 text-slate-800 hover:border-indigo-300 shadow-2xs"
            }`}
          >
            {/* Flip Card Badge Tag */}
            <div className="flex items-center justify-between text-xs font-medium">
              <span className={isFlipped ? "text-indigo-400" : "text-indigo-600"}>
                {isFlipped ? "ANSWER" : "QUESTION"}
              </span>

              <span className={`inline-flex items-center gap-1 ${isFlipped ? "text-slate-400" : "text-slate-400"}`}>
                <RotateCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                Flip
              </span>
            </div>

            {/* Main Content Text Area */}
            <div className="my-auto py-4 text-center">
              <p className={`text-base sm:text-lg font-medium leading-relaxed ${isFlipped ? "text-slate-100" : "text-slate-800"}`}>
                {isFlipped ? card.answer : card.question}
              </p>
            </div>

            {/* Bottom Footer Hint */}
            <div className="text-center">
              <span className={`text-[11px] ${isFlipped ? "text-slate-500" : "text-slate-400"}`}>
                {isFlipped ? "Click again to show question" : "Click card to reveal answer"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation & Flip Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <button
            onClick={toggleFlip}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
          >
            {isFlipped ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>{isFlipped ? "Hide Answer" : "Show Answer"}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={current === totalCards - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default Flashcards;