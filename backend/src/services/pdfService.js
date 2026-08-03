import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractPDFText(filePath) {
  try {
    // Read the uploaded PDF
    const buffer = await fs.readFile(filePath);

    // Convert Buffer to Uint8Array
    const data = new Uint8Array(buffer);

    const pdf = await pdfjsLib.getDocument({
      data,
    }).promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      fullText += pageText + "\n";
    }

    return {
      pages: pdf.numPages,
      text: fullText,
    };

  } catch (error) {
    console.error("========== PDF ERROR ==========");
    console.error(error);
    console.error("===============================");

    throw error;
  }
}