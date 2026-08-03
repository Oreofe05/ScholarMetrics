export const cleanText = (text) => {
  if (!text) return "";

  return text
    // Remove multiple blank lines
    .replace(/\n\s*\n/g, "\n")

    // Replace tabs with spaces
    .replace(/\t/g, " ")

    // Remove multiple spaces
    .replace(/ +/g, " ")

    // Remove page numbers on separate lines
    .replace(/^\d+\s*$/gm, "")

    // Trim leading/trailing spaces
    .trim();
};