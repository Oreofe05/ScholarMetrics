export const getClassification = (cgpa, scale) => {
  const gpa = Number(cgpa);

  if (scale === 5) {
    if (gpa >= 4.5) return "First Class";
    if (gpa >= 3.5) return "Second Class Upper";
    if (gpa >= 2.4) return "Second Class Lower";
    if (gpa >= 1.5) return "Third Class";
    if (gpa >= 1.0) return "Pass";
    return "Fail";
  }

  // 4-point scale
  if (gpa >= 3.5) return "First Class";
  if (gpa >= 3.0) return "Second Class Upper";
  if (gpa >= 2.0) return "Second Class Lower";
  if (gpa >= 1.0) return "Third Class";
  return "Fail";
};