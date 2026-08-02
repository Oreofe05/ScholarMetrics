export function generateTimetable(courses) {
  const timetable = [];
  const today = new Date();

  // Available study periods
  const studyPeriods = [
    "9:00 AM - 10:30 AM",
    "11:00 AM - 12:30 PM",
    "2:00 PM - 3:30 PM",
    "4:00 PM - 5:30 PM",
    "7:00 PM - 8:30 PM",
  ];

  // Sort courses by nearest exam
  const sortedCourses = [...courses].sort(
    (a, b) => new Date(a.examDate) - new Date(b.examDate)
  );

  sortedCourses.forEach((course) => {
    const examDate = new Date(course.examDate);

    const daysRemaining = Math.max(
      1,
      Math.ceil(
        (examDate.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    // Collect all incomplete chapters
    let chapters = [];

    course.analysis?.forEach((report) => {
      if (!report.progress) return;

      report.progress.forEach((chapter) => {
        if (!chapter.completed) {
          chapters.push(chapter);
        }
      });
    });

    // Remove duplicate chapters
    chapters = chapters.filter(
      (chapter, index, self) =>
        index ===
        self.findIndex(
          (c) =>
            c.chapterNumber === chapter.chapterNumber ||
            c.title === chapter.title
        )
    );

    // Sort chapters numerically
    chapters.sort(
      (a, b) =>
        (a.chapterNumber || 0) -
        (b.chapterNumber || 0)
    );

    if (chapters.length === 0) return;

    // Chapters to study per day
    const chaptersPerDay = Math.max(
      1,
      Math.ceil(chapters.length / daysRemaining)
    );

    for (let day = 0; day < daysRemaining; day++) {

      const todaysChapters = chapters.slice(
        day * chaptersPerDay,
        (day + 1) * chaptersPerDay
      );

      if (todaysChapters.length === 0) break;

      const studyDate = new Date(today);

      studyDate.setDate(today.getDate() + day);

      timetable.push({
        date: studyDate.toLocaleDateString(),

        time:
          studyPeriods[
            day % studyPeriods.length
          ],

        courseCode: course.courseCode,

        courseName: course.courseName,

        examDate: course.examDate,

        chapters: todaysChapters,

        estimatedHours: Number(
          (
            (course.estimatedHours || 1) /
            chapters.length *
            todaysChapters.length
          ).toFixed(1)
        ),
      });
    }
  });

  return timetable;
}