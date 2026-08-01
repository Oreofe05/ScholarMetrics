export const generateStudyPlan = (
  chapters,
  examDate
) => {
  if (!chapters || chapters.length === 0) {
    return [];
  }

  const today = new Date();
  const exam = new Date(examDate);

  today.setHours(0, 0, 0, 0);
  exam.setHours(0, 0, 0, 0);

  const totalDays = Math.max(
    1,
    Math.ceil(
      (exam - today) /
      (1000 * 60 * 60 * 24)
    )
  );

  const plan = [];

  let currentDay = 1;

  chapters.forEach((chapter) => {

    let pagesRemaining = chapter.pageCount;

    let currentPage = chapter.startPage;

    while (pagesRemaining > 0) {

      let pagesToday = 10;

      if (chapter.difficulty === "Hard") {
        pagesToday = 8;
      }

      if (chapter.difficulty === "Easy") {
        pagesToday = 15;
      }

      pagesToday = Math.min(
        pagesToday,
        pagesRemaining
      );

      plan.push({

        day: currentDay,

        type: "Study",

        chapter: chapter.title,

        startPage: currentPage,

        endPage:
          currentPage +
          pagesToday -
          1,

        pages: pagesToday,

        estimatedHours:
          Math.ceil(
            pagesToday / 6
          ),

      });

      pagesRemaining -= pagesToday;

      currentPage += pagesToday;

      currentDay++;

    }

    plan.push({

      day: currentDay,

      type: "Quiz",

      chapter: chapter.title,

      estimatedHours: 1,

    });

    currentDay++;

  });

  while (currentDay <= totalDays) {

    plan.push({

      day: currentDay,

      type: "Revision",

      chapter:
        "General Revision",

      estimatedHours: 2,

    });

    currentDay++;

  }

  return plan;
};