import { useState, useEffect, useCallback } from "react";
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

function Flashcards({ flashcards = [] }) {
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const totalCards = flashcards.length;

  const progressPercentage =
    totalCards > 0
      ? ((current + 1) / totalCards) * 100
      : 0;

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

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!totalCards) return;

      if (e.key === "ArrowRight") {
        handleNext();
      }

      if (e.key === "ArrowLeft") {
        handlePrev();
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleFlip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [handleNext, handlePrev, totalCards]);

  if (totalCards === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center mt-6">
        <Layers
          className="mx-auto text-slate-400 mb-3"
          size={22}
        />

        <h4 className="font-semibold">
          No Flashcards Available
        </h4>

        <p className="text-sm text-slate-500 mt-2">
          AI flashcards have not been generated yet.
        </p>
      </div>
    );
  }

  const card = flashcards[current];

  return (
    <div className="mt-8 space-y-4">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <Sparkles
            className="text-indigo-600"
            size={18}
          />

          <div>
            <h3 className="font-bold">
              Flashcards
            </h3>

            <p className="text-sm text-slate-500">
              Card {current + 1} of {totalCards}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-slate-100 rounded-full h-2 overflow-hidden">

        <div
          className="bg-indigo-600 h-full"
          style={{
            width: `${progressPercentage}%`,
          }}
        />

      </div>

      <div
        onClick={toggleFlip}
        className={`rounded-2xl p-8 cursor-pointer transition ${
          isFlipped
            ? "bg-slate-900 text-white"
            : "bg-slate-50"
        }`}
      >

        <div className="flex justify-between">

          <span className="text-xs font-semibold">
            {isFlipped
              ? "ANSWER"
              : "QUESTION"}
          </span>

          <RotateCw size={16} />

        </div>

        <div className="py-12 text-center">

          <p className="text-lg font-medium">

            {isFlipped
              ? card.answer
              : card.question}

          </p>

        </div>

      </div>

      <div className="flex justify-between">

        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="px-4 py-2 rounded-xl bg-slate-100 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={toggleFlip}
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white flex items-center gap-2"
        >
          {isFlipped ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}

          {isFlipped
            ? "Hide Answer"
            : "Show Answer"}
        </button>

        <button
          onClick={handleNext}
          disabled={current === totalCards - 1}
          className="px-4 py-2 rounded-xl bg-slate-100 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}

export default Flashcards;