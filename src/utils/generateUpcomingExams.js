export function generateUpcomingExams(uploadedCourses) {
  if (!uploadedCourses || uploadedCourses.length === 0) {
    return [];
  }

  const today = new Date();

  return uploadedCourses
    .filter((course) => course.examDate)
    .map((course) => {
      const examDate = new Date(course.examDate);

      const daysLeft = Math.max(
        0,
        Math.ceil(
          (examDate - today) /
            (1000 * 60 * 60 * 24)
        )
      );

      let status = "safe";

      if (daysLeft <= 3) {
        status = "critical";
      } else if (daysLeft <= 7) {
        status = "warning";
      }

      // Percentage of urgency (0–100)
      const progress = Math.max(
        0,
        Math.min(
          100,
          100 - daysLeft * 5
        )
      );

      return {
        id: course.id,
        courseCode: course.courseCode,
        courseName: course.courseName,
        examDate: course.examDate,
        daysLeft,
        status,
        progress,
      };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft);
}