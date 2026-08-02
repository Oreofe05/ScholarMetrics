export const exportAllSemestersCSV = (semesters) => {
  const rows = [
    "Semester,Course Code,Unit,Grade",
  ];

  semesters.forEach((semester, index) => {
    semester.courses.forEach((course) => {
      rows.push(
        `${semester.customName || `Semester ${index + 1}`},${course.courseCode},${course.unit},${course.grade}`
      );
    });
  });

  const blob = new Blob(
    [rows.join("\n")],
    {
      type: "text/csv",
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "all-semesters.csv";
  a.click();

  URL.revokeObjectURL(url);
};