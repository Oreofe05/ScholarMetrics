import { askGemini } from "./ai/geminiProvider.js";

import {
  SUMMARY_PROMPT,
  FLASHCARD_PROMPT,
  QUIZ_PROMPT,
  STUDY_PLAN_PROMPT,
} from "./ai/promptTemplates.js";

import { parseAIResponse } from "../utils/parseAIResponse.js";

// =========================
// AI SUMMARY
// =========================
export async function generateSummary(chunks) {
  const document = chunks
    .map((chunk) => chunk.content)
    .join("\n\n");

  const prompt = `
${SUMMARY_PROMPT}

Lecture Material:

${document}
`;

  return await askGemini(prompt);
}

// =========================
// AI FLASHCARDS
// =========================
export async function generateFlashcards(chunks) {
  const document = chunks
    .map((chunk) => chunk.content)
    .join("\n\n");

  const prompt = `
${FLASHCARD_PROMPT}

Lecture Material:

${document}
`;

  const response = await askGemini(prompt);

  return parseAIResponse(response);
}

// =========================
// AI QUIZ
// =========================
export async function generateQuiz(chunks) {
  const document = chunks
    .map((chunk) => chunk.content)
    .join("\n\n");

  const prompt = `
${QUIZ_PROMPT}

Lecture Material:

${document}
`;

  const response = await askGemini(prompt);

  return parseAIResponse(response);
}

// =========================
// AI STUDY PLAN
// =========================
export async function generateStudyPlan(chunks) {
  const document = chunks
    .map((chunk) => chunk.content)
    .join("\n\n");

  const prompt = `
${STUDY_PLAN_PROMPT}

Lecture Material:

${document}
`;

  return await askGemini(prompt);
}