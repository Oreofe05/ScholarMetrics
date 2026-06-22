function SemesterStats({
  highestScore,
  lowestScore,
  totalQualityPoints,
  numberOfA,
})

{
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <div className="bg-green-500 text-white p-5 rounded-2xl shadow">
        <h3 className="text-sm opacity-80">
          Highest Score
        </h3>

        <p className="text-3xl font-bold">
          {highestScore}
        </p>
      </div>

      <div className="bg-red-500 text-white p-5 rounded-2xl shadow">
        <h3 className="text-sm opacity-80">
          Lowest Score
        </h3>

        <p className="text-3xl font-bold">
          {lowestScore}
        </p>
      </div>

      <div className="bg-blue-500 text-white p-5 rounded-2xl shadow">
        <h3 className="text-sm opacity-80">
          Quality Points
        </h3>

        <p className="text-3xl font-bold">
          {totalQualityPoints}
        </p>
      </div>

      <div className="bg-purple-500 text-white p-5 rounded-2xl shadow">
        <h3 className="text-sm opacity-80">
          A Grades
        </h3>

        <p className="text-3xl font-bold">
          {numberOfA}
        </p>
      </div>

    </div>
  );
}

export default SemesterStats;