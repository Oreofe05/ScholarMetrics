export function generateInsights({
  uploadedCourses,
  assignments,
  cgpa,
}) {
  const insights = [];

  const today = new Date();

  // ==========================
  // CGPA Insight
  // ==========================

  if (cgpa >= 4.5) {
    insights.push({
      type: "success",
      title: "Excellent Performance",
      message:
        "Outstanding work! Your academic performance is excellent.",
    });
  } else if (cgpa >= 3.5) {
    insights.push({
      type: "success",
      title: "Strong Academic Performance",
      message:
        "You're maintaining a strong CGPA. Keep up the consistency.",
    });
  } else {
    insights.push({
      type: "warning",
      title: "CGPA Needs Attention",
      message:
        "Your CGPA is below your target. Spend more time on your weakest courses.",
    });
  }

  // ==========================
  // Upcoming Exams
  // ==========================

  uploadedCourses.forEach((course) => {
    if (!course.examDate) return;

    const examDate = new Date(course.examDate);

    const daysLeft = Math.ceil(
      (examDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft >= 0 && daysLeft <= 7) {
      insights.push({
        type: "danger",
        title: `${course.courseCode} Exam`,
        message: `Only ${daysLeft} day(s) left before your exam.`,
      });
    }
  });

  // ==========================
  // Assignment Progress
  // ==========================

  if (assignments.length > 0) {
    const completed = assignments.filter(
      (assignment) => assignment.completed
    ).length;

    const completion =
      (completed / assignments.length) * 100;

    if (completion < 50) {
      insights.push({
        type: "warning",
        title: "Assignments Behind",
        message:
          "Complete pending assignments before starting new topics.",
      });
    } else if (completion === 100) {
      insights.push({
        type: "success",
        title: "Assignments Completed",
        message:
          "Excellent! All current assignments are complete.",
      });
    }
  }

  // ==========================
  // Difficult Courses
  // ==========================

  uploadedCourses.forEach((course) => {
    if (course.difficulty === "Hard") {
      insights.push({
        type: "info",
        title: `${course.courseCode}`,
        message:
          "This course is marked as difficult. Schedule extra revision sessions.",
      });
    }
  });

  // ==========================
  // Empty State
  // ==========================

  if (insights.length === 0) {
    insights.push({
      type: "info",
      title: "Welcome",
      message:
        "Start adding courses and assignments to receive personalized insights.",
    });
  }

  return insights.slice(0, 5);
}