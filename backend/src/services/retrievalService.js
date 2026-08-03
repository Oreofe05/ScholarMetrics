import prisma from "../config/prisma.js";

export async function retrieveRelevantChunks(materialId, question) {
  const chunks = await prisma.materialChunk.findMany({
    where: {
      materialId,
    },
    orderBy: {
      chunkIndex: "asc",
    },
  });

  const keywords = question
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2);

  const scored = chunks.map(chunk => {

    const text = chunk.content.toLowerCase();

    let score = 0;

    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score++;
      }
    });

    return {
      ...chunk,
      score,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}