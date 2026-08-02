export const calculateSemesterGPA = (
  courses,
  gradePoints
) => {
  if (!courses?.length) return 0;

  let totalQP = 0;
  let totalUnits = 0;

  courses.forEach((course) => {
    totalQP +=
      gradePoints[course.grade] *
      course.unit;

    totalUnits += course.unit;
  });

  return totalUnits === 0
    ? 0
    : totalQP / totalUnits;
};

export const calculateCGPA = (
  semesters,
  gradePoints
) => {
  let totalQP = 0;
  let totalUnits = 0;

  semesters.forEach((semester) => {
    semester.courses.forEach((course) => {
      totalQP +=
        gradePoints[course.grade] *
        course.unit;

      totalUnits += course.unit;
    });
  });

  return totalUnits === 0
    ? "0.00"
    : (totalQP / totalUnits).toFixed(2);
};