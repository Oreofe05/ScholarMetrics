export default function generateMasterStudyPlan(uploadedCourses) {
  if (!uploadedCourses || uploadedCourses.length === 0) {
    return [];
  }

  const today = new Date();
  const studyPlan = [];

  // Sort by nearest exam first
  const sortedCourses = [...uploadedCourses].sort(
    (a, b) => new Date(a.examDate) - new Date(b.examDate)
  );

  sortedCourses.forEach((course) => {
    const examDate = new Date(course.examDate);

    const daysRemaining = Math.max(
      1,
      Math.ceil(
        (examDate - today) / (1000 * 60 * 60 * 24)
      )
    );

    const totalHours = course.estimatedHours || 1;

    const hoursPerDay = Math.max(
      1,
      Math.ceil(totalHours / daysRemaining)
    );

    let chapters = [];

    if (course.analysis) {
      course.analysis.forEach((report) => {
        if (report.chapters) {
          chapters.push(...report.chapters);
        }
      });
    }

    // If no chapters detected
    if (chapters.length === 0) {
      chapters.push({
        title: "General Revision",
      });
    }

    chapters.forEach((chapter, index) => {
      const studyDate = new Date(today);

      studyDate.setDate(today.getDate() + index);

      if (studyDate > examDate) return;

      studyPlan.push({
        date: studyDate.toLocaleDateString(),

        courseCode: course.courseCode,

        courseName: course.courseName,

        chapter: chapter.title,

        hours: hoursPerDay,

        difficulty: course.difficulty,
      });
    });
  });

  return studyPlan;
}