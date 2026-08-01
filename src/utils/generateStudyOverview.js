export function generateStudyOverview(courses) {

  let totalCourses = courses.length;

  let totalChapters = 0;

  let totalHours = 0;

  let nearestCourse = null;

  let nearestDays = Infinity;

  courses.forEach(course => {

    totalHours += course.estimatedHours || 0;

    course.analysis?.forEach(report => {

      const remaining =
        report.progress?.filter(
          chapter => !chapter.completed
        ) || [];

      totalChapters += remaining.length;

    });

    const days = Math.ceil(
      (new Date(course.examDate) - new Date()) /
      (1000 * 60 * 60 * 24)
    );

    if (days < nearestDays) {
      nearestDays = days;
      nearestCourse = course;
    }

  });

  return {

    totalCourses,

    totalChapters,

    totalHours,

    nearestCourse,

    nearestDays,

  };

}