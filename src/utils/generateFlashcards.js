export default function generateFlashcards(report) {
  const flashcards = [];

  // Generate from topics
  if (report.topics && report.topics.length > 0) {
    report.topics.forEach((topic) => {
      flashcards.push({
        question: `Explain ${topic}.`,
        answer: `Review the topic "${topic}" and understand its key concepts before your exam.`,
      });
    });
  }

  // Generate from keywords
  if (report.keywords && report.keywords.length > 0) {
    report.keywords.forEach((keyword) => {
      flashcards.push({
        question: `What is ${keyword}?`,
        answer: `${keyword} is an important concept extracted from your study material.`,
      });
    });
  }

  // Limit to first 20 cards
  return flashcards.slice(0, 20);
}