export function generateWeeklyProgress(uploadedCourses = []) {
  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const dailyProgress = days.map((day) => ({
    day,
    chapters: 0,
    hours: 0,
  }));

  let totalChapters = 0;
  let completedChapters = 0;
  let totalHours = 0;

  uploadedCourses.forEach((course) => {
    course.analysis?.forEach((report) => {
      report.progress?.forEach((chapter) => {
        totalChapters++;

        if (chapter.completed) {
          completedChapters++;

          const randomDay = Math.floor(Math.random() * 7);

          dailyProgress[randomDay].chapters += 1;

          dailyProgress[randomDay].hours += 1;
        }
      });

      totalHours += report.estimatedHours || 0;
    });
  });

  const weeklyHours = dailyProgress.reduce(
    (sum, day) => sum + day.hours,
    0
  );

  const consistency =
    dailyProgress.filter((day) => day.hours > 0).length;

  return {
    dailyProgress,
    weeklyHours,
    totalChapters,
    completedChapters,
    consistency,
    completion:
      totalChapters === 0
        ? 0
        : Math.round(
            (completedChapters / totalChapters) * 100
          ),
  };
}