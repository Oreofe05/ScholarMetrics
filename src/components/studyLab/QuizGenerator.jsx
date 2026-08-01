import { useState } from "react";

function QuizGenerator({ report }) {
  const [questions, setQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const generateQuiz = () => {
    if (!report.keywords || report.keywords.length === 0) {
      return;
    }

    const quiz = report.keywords
      .slice(0, 10)
      .map((keyword, index) => ({
        id: index + 1,
        question: `Explain the concept of "${keyword}".`,
      }));

    setQuestions(quiz);
    setShowQuiz(true);
  };

  return (
    <div className="mt-6 bg-white border rounded-xl p-5">

      <div className="flex justify-between items-center">

        <h3 className="text-xl font-bold">
          📝 Self Test
        </h3>

        <button
          onClick={generateQuiz}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Generate Quiz
        </button>

      </div>

      {!showQuiz ? (
        <p className="text-gray-500 mt-4">
          Generate practice questions from this material.
        </p>
      ) : (
        <div className="space-y-5 mt-5">

          {questions.map((question) => (

            <div
              key={question.id}
              className="border rounded-lg p-4"
            >
              <h4 className="font-semibold">
                Question {question.id}
              </h4>

              <p className="mt-2">
                {question.question}
              </p>

              <textarea
                rows={3}
                placeholder="Type your answer..."
                className="w-full mt-3 border rounded-lg p-3"
              />

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default QuizGenerator;