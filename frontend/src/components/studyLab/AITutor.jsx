import { useState } from "react";

function AITutor({ report }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askTutor = () => {
    if (!question.trim()) return;

    let response = "";

    if (
      question.toLowerCase().includes("chapter")
    ) {
      response =
        "Review the chapter list below and focus on the learning objectives before reading.";
    } else if (
      question.toLowerCase().includes("keyword")
    ) {
      response =
        "Pay special attention to the detected keywords because they appear frequently throughout the material.";
    } else if (
      question.toLowerCase().includes("difficult")
    ) {
      response =
        `This material is classified as ${report.difficulty}. Spend more time on difficult concepts and review them again after 24 hours.`;
    } else {
      response =
        "AI Tutor is ready. Connect an AI API to receive intelligent answers based on your uploaded notes.";
    }

    setAnswer(response);
  };

  return (
    <div className="mt-6 bg-white border rounded-xl p-5">

      <h3 className="text-xl font-bold">
        🤖 AI Tutor
      </h3>

      <textarea
        className="w-full border rounded-lg p-3 mt-4"
        rows={4}
        placeholder="Ask a question about this material..."
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />

      <button
        onClick={askTutor}
        className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg"
      >
        Ask Tutor
      </button>

      {answer && (
        <div className="mt-5 bg-indigo-50 rounded-lg p-4">
          <h4 className="font-bold mb-2">
            Answer
          </h4>

          <p>{answer}</p>
        </div>
      )}

    </div>
  );
}

export default AITutor;