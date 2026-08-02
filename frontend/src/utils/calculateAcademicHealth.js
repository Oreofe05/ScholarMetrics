export function calculateAcademicHealth({
  courses = [],
  assignments = [],
  cgpa = 0,
}) {

  // -----------------------------
  // Study Progress
  // -----------------------------

  let totalChapters = 0;
  let completedChapters = 0;

  courses.forEach((course) => {

    course.analysis?.forEach((report) => {

      report.progress?.forEach((chapter) => {

        totalChapters++;

        if (chapter.completed) {
          completedChapters++;
        }

      });

    });

  });

  const studyProgress =
    totalChapters === 0
      ? 0
      : Math.round(
          (completedChapters / totalChapters) * 100
        );

  // -----------------------------
  // Exam Readiness
  // -----------------------------

  const readiness =
    courses.length === 0
      ? 0
      : Math.round(
          courses.reduce(
            (sum, course) =>
              sum + (course.readinessScore || 0),
            0
          ) / courses.length
        );

  // -----------------------------
  // Assignment Completion
  // -----------------------------

  const assignmentCompletion =
    assignments.length === 0
      ? 100
      : Math.round(
          (assignments.filter(
            (assignment) => assignment.completed
          ).length /
            assignments.length) *
            100
        );

  // -----------------------------
  // CGPA Score
  // -----------------------------

  const cgpaScore = Math.round((cgpa / 5) * 100);

  // -----------------------------
  // Consistency
  // -----------------------------

  const consistency = 75;

  // -----------------------------
  // Overall Score
  // -----------------------------

  const overall = Math.round(

    studyProgress * 0.30 +

    readiness * 0.25 +

    assignmentCompletion * 0.20 +

    cgpaScore * 0.15 +

    consistency * 0.10

  );

  return {
    studyProgress,
    readiness,
    assignmentCompletion,
    cgpaScore,
    consistency,
    overall,
  };
}