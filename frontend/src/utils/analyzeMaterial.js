export const analyzeMaterial = (
  text,
  pages
) => {
  // -------------------------
  // Words
  // -------------------------

  const words = text
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const wordCount = words.length;

  // -------------------------
  // Paragraphs
  // -------------------------

  const paragraphCount = text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .length;

  // -------------------------
  // Estimated Pages
  // -------------------------

  const estimatedPages = Math.ceil(wordCount / 500);

  // -------------------------
  // Estimated Reading Hours
  // -------------------------

  const estimatedHours = Math.max(
    1,
    Math.ceil(wordCount / 800)
  );

  // -------------------------
  // Difficulty
  // -------------------------

  let difficulty = "Easy";

  if (wordCount > 3000) {
    difficulty = "Medium";
  }

  if (wordCount > 8000) {
    difficulty = "Hard";
  }

  // -------------------------
  // Reading Time
  // -------------------------

  const readingMinutes = Math.ceil(
    wordCount / 200
  );

  // -------------------------
  // Chapter Detection
  // -------------------------

 // -------------------------
// Chapter Detection
// -------------------------

const chapterRegex =
  /(chapter\s+\d+[:.\-]?\s*.*|unit\s+\d+[:.\-]?\s*.*|module\s+\d+[:.\-]?\s*.*)/gi;

const chapters = [];

if (pages && pages.length > 0) {

  pages.forEach((page) => {

    const matches =
      page.text.match(chapterRegex);

    if (matches) {

      matches.forEach((match) => {

        chapters.push({

          title: match.trim(),

          page: page.pageNumber,

        });

      });

    }

  });

}

// -------------------------
// Calculate Chapter Length
// -------------------------

const chapterDetails = chapters.map(
  (chapter, index) => {

    const startPage =
      chapter.page;

    const endPage =
      index === chapters.length - 1
        ? pages.length
        : chapters[index + 1].page - 1;

    const pageCount =
      endPage - startPage + 1;

    const estimatedHours =
      Math.max(
        1,
        Math.ceil(pageCount / 8)
      );

    let difficulty = "Easy";

    if (pageCount > 15)
      difficulty = "Medium";

    if (pageCount > 30)
      difficulty = "Hard";

    return {

      chapterNumber:
        index + 1,

      title:
        chapter.title,

      startPage,

      endPage,

      pageCount,

      estimatedHours,

      difficulty,

    };

  }
);

  // -------------------------
  // Topic Detection
  // -------------------------

  const topics = [];

  text.split("\n").forEach((line) => {
    const clean = line.trim();

    if (
      clean.length > 8 &&
      clean.length < 80 &&
      clean === clean.toUpperCase()
    ) {
      topics.push(clean);
    }
  });

  // -------------------------
  // Keywords
  // -------------------------

  const stopWords = [
    "the",
    "and",
    "for",
    "this",
    "that",
    "with",
    "from",
    "have",
    "will",
    "your",
    "into",
    "their",
    "there",
    "about",
    "were",
    "been",
    "also",
    "they",
    "them",
    "which",
    "where",
    "when",
    "what",
    "then",
    "than",
  ];

  const frequency = {};

  words.forEach((word) => {
    const clean = word
      .toLowerCase()
      .replace(/[^a-z]/g, "");

    if (
      clean.length > 4 &&
      !stopWords.includes(clean)
    ) {
      frequency[clean] =
        (frequency[clean] || 0) + 1;
    }
  });

  const keywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);

  // -------------------------
  // Complexity Score
  // -------------------------

  const complexityScore = Math.min(
    100,
    Math.round(
      wordCount / 150 +
      paragraphCount / 10
    )
  );

  // -------------------------
  // Suggested Study Sessions
  // -------------------------

  const studySessions = Math.ceil(
    estimatedHours / 2
  );

  // -------------------------
  // Return
  // -------------------------

  return {
    wordCount,
    paragraphCount,
    estimatedPages,
    estimatedHours,
    readingMinutes,
    difficulty,
    chapters: chapterDetails,
    topics,
    keywords,
    complexityScore,
    studySessions,
  };
};