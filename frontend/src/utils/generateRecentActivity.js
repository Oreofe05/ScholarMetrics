export function generateRecentActivity({
  uploadedCourses = [],
  assignments = [],
  courses = [],
}) {
  const activities = [];

  // Uploaded Courses
  uploadedCourses.forEach((course) => {
    activities.push({
      type: "course",
      title: `${course.courseCode} added`,
      message: `${course.courseName} has been added to your Study Lab.`,
      date: course.createdAt || "Recently",
    });
  });

  // Assignments
  assignments.forEach((assignment) => {
    activities.push({
      type: assignment.completed ? "success" : "assignment",
      title: assignment.completed
        ? "Assignment Completed"
        : "New Assignment",
      message: assignment.title,
      date: assignment.deadline || "No deadline",
    });
  });

  // CGPA Courses
  courses.forEach((course) => {
    activities.push({
      type: "cgpa",
      title: `${course.courseCode} Added`,
      message: `Grade ${course.grade} (${course.unit} Unit${
        course.unit > 1 ? "s" : ""
      })`,
      date: "Recently",
    });
  });

  // Sort newest first
  activities.sort((a, b) => {
    if (a.date === "Recently") return -1;
    if (b.date === "Recently") return 1;

    return new Date(b.date) - new Date(a.date);
  });

  return activities.slice(0, 10);
}