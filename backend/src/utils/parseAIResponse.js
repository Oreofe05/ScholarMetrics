export function parseAIResponse(response) {
  try {
    // Remove markdown code fences if they exist
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Failed to parse AI response");

    throw new Error("Invalid AI response format.");
  }
}