function ExamReadiness({ score }) {
  let color = "text-red-600";
  let bg = "bg-red-100";

  if (score >= 50) {
    color = "text-yellow-600";
    bg = "bg-yellow-100";
  }

  if (score >= 80) {
    color = "text-green-600";
    bg = "bg-green-100";
  }

  return (
    <div
      className={`${bg} rounded-xl p-5 mt-6`}
    >
      <h3 className="font-bold text-lg">
        🎯 Exam Readiness
      </h3>

      <p
        className={`text-4xl font-bold mt-2 ${color}`}
      >
        {score}%
      </p>

      <div className="w-full h-3 rounded-full bg-white mt-4">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ExamReadiness;