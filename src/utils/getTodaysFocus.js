export function getTodaysFocus(uploadedCourses) {

  if (!uploadedCourses.length) {
    return {
      title: "No Courses",
      subtitle: "Add a course to begin",
    };
  }

  // Courses with exams
  const upcoming = uploadedCourses
    .filter(course => course.examDate)
    .map(course => {

      const today = new Date();

      const exam = new Date(course.examDate);

      const daysLeft = Math.ceil(
        (exam - today) /
        (1000 * 60 * 60 * 24)
      );

      return {
        ...course,
        daysLeft,
      };

    })
    .filter(course => course.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  if (upcoming.length === 0) {
    return {
      title: "Continue Studying",
      subtitle: uploadedCourses[0].courseCode,
    };
  }

  const course = upcoming[0];

  return {

    title: course.courseCode,

    subtitle:
      course.daysLeft === 0
        ? "Exam Today"
        : `${course.daysLeft} day(s) remaining`,

  };

}