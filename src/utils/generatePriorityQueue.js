export function generatePriorityQueue(courses = []) {

  const today = new Date();

  return courses
    .map((course) => {

      const examDate = new Date(course.examDate);

      const daysRemaining = Math.max(
        1,
        Math.ceil(
          (examDate.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
        )
      );

      let totalChapters = 0;
      let completedChapters = 0;

      course.analysis?.forEach((report) => {

        report.progress?.forEach((chapter) => {

          totalChapters++;

          if (chapter.completed) {
            completedChapters++;
          }

        });

      });

      const remaining =
        totalChapters - completedChapters;

      const readiness =
        totalChapters === 0
          ? 0
          : Math.round(
              (completedChapters / totalChapters) * 100
            );

      // Higher score = higher priority
      const priority =

        (100 - readiness) +

        remaining * 5 +

        Math.max(0, 30 - daysRemaining);

      return {

        ...course,

        totalChapters,

        completedChapters,

        remaining,

        readiness,

        daysRemaining,

        priority,

      };

    })

    .sort(
      (a, b) =>
        b.priority - a.priority
    )

    .slice(0, 5);

}