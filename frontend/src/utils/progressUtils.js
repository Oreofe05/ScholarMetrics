export function initializeProgress(chapters = []) {
  return chapters.map((chapter) => ({
    ...chapter,
    completed: false,
  }));
}

export function calculateProgress(progress = []) {
  if (progress.length === 0) return 0;

  const completed = progress.filter(
    (chapter) => chapter.completed
  ).length;

  return Math.round((completed / progress.length) * 100);
}