export function calculateReadiness(course, daysRemaining) {
  if (!course.analysis?.length) return 0;

  //--------------------------------------------------
  // Progress
  //--------------------------------------------------

  let totalChapters = 0;
  let completedChapters = 0;

  course.analysis.forEach((report) => {
    const progress = report.progress || [];

    totalChapters += progress.length;

    completedChapters += progress.filter(
      (chapter) => chapter.completed
    ).length;
  });

  const progressScore =
    totalChapters === 0
      ? 0
      : (completedChapters / totalChapters) * 100;

  //--------------------------------------------------
  // Reading
  //--------------------------------------------------

  const readingScore = Math.min(
    100,
    (course.estimatedHours || 1) * 10
  );

  //--------------------------------------------------
  // Exam Time
  //--------------------------------------------------

  let timeScore = 100;

  if (daysRemaining < 30) timeScore = 80;

  if (daysRemaining < 14) timeScore = 60;

  if (daysRemaining < 7) timeScore = 40;

  if (daysRemaining < 3) timeScore = 20;

  //--------------------------------------------------
  // Difficulty
  //--------------------------------------------------

  let difficultyScore = 100;

  if (course.difficulty === "Medium")
    difficultyScore = 80;

  if (course.difficulty === "Hard")
    difficultyScore = 60;

  //--------------------------------------------------
  // Final Score
  //--------------------------------------------------

  const score =
    progressScore * 0.5 +
    readingScore * 0.2 +
    timeScore * 0.2 +
    difficultyScore * 0.1;

  return Math.round(score);
}