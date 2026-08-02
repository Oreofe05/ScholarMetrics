export function calculateStudyStreak(uploadedCourses) {

  let completedToday = false;

  uploadedCourses.forEach(course => {

    course.analysis?.forEach(report => {

      report.progress?.forEach(chapter => {

        if (chapter.completed) {
          completedToday = true;
        }

      });

    });

  });

  if (!completedToday) {
    return 0;
  }

  // Temporary version
  // Later we'll calculate consecutive days
  return 1;
}