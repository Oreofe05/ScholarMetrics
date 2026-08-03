import { askGemini } from "./ai/geminiProvider.js";
import { CHAT_PROMPT } from "./ai/promptTemplates.js";
import { retrieveRelevantChunks } from "./retrievalService.js";

export async function chatWithMaterial(materialId, question) {

  const chunks = await retrieveRelevantChunks(materialId, question);

  const lecture = chunks
    .map(chunk => chunk.content)
    .join("\n\n");

  const prompt = `
${CHAT_PROMPT}

Lecture Material:

${lecture}

Student Question:

${question}
`;

  return await askGemini(prompt);

}