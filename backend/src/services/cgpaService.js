export const calculateCGPA = (results) => {
  let totalUnits = 0;
  let totalQualityPoints = 0;

  results.forEach((result) => {
    totalUnits += result.unit;
    totalQualityPoints += result.unit * result.gradePoint;
  });

  const cgpa =
    totalUnits === 0
      ? 0
      : Number((totalQualityPoints / totalUnits).toFixed(2));

  return {
    totalUnits,
    totalQualityPoints,
    cgpa,
  };
};