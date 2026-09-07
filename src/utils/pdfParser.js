// PDF Text & Question Extractor using pdfjs-dist
import * as pdfjsLib from "pdfjs-dist";

// Set worker source for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export async function extractQuestionsFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n---PAGE---\n";
    }

    return parseRawPDFTextToQuestions(fullText, file.name);
  } catch (err) {
    console.error("PDF Parsing Error:", err);
    throw new Error("Could not extract text from PDF: " + err.message);
  }
}

export function parseRawPDFTextToQuestions(rawText, fileName = "PDF Workbook") {
  // Split PDF text into blocks (by question numbers or separators)
  const blocks = rawText.split(/(?=\bQ\d+[:.]|\bQuestion\s+\d+[:.]|---PAGE---|---)/i).filter((b) => b.trim().length > 15);
  const parsedQuestions = [];

  let currentTopic = "PDF Workbook Set";
  let currentDifficulty = "Medium";

  blocks.forEach((block, idx) => {
    const lines = block.split(/\n|\r/).map((l) => l.trim()).filter(Boolean);
    let qText = "";
    let opts = ["Option A", "Option B", "Option C", "Option D"];
    let answer = 0;
    let exp = "Step-by-step mathematical derivation extracted from PDF.";

    // Auto-detect topic & difficulty headings from PDF text
    const lowerBlock = block.toLowerCase();
    if (lowerBlock.includes("partnership")) currentTopic = "Partnership";
    else if (lowerBlock.includes("profit") || lowerBlock.includes("loss")) currentTopic = "Profit & Loss";
    else if (lowerBlock.includes("speed") || lowerBlock.includes("train") || lowerBlock.includes("distance")) currentTopic = "Speed & Distance";
    else if (lowerBlock.includes("work") || lowerBlock.includes("pipe") || lowerBlock.includes("cistern")) currentTopic = "Work & Time";
    else if (lowerBlock.includes("ratio") || lowerBlock.includes("proportion")) currentTopic = "Ratio & Proportion";
    else if (lowerBlock.includes("gate") || lowerBlock.includes("matrix") || lowerBlock.includes("algorithm")) currentTopic = "GATE Engineering";

    if (lowerBlock.includes("easy") || lowerBlock.includes("level 1") || lowerBlock.includes("part 1")) currentDifficulty = "Easy";
    else if (lowerBlock.includes("hard") || lowerBlock.includes("level 3") || lowerBlock.includes("part 3") || lowerBlock.includes("advanced")) currentDifficulty = "Hard";
    else if (lowerBlock.includes("medium") || lowerBlock.includes("level 2") || lowerBlock.includes("part 2")) currentDifficulty = "Medium";

    // Extract options and question text
    lines.forEach((line) => {
      if (line.match(/^(Q\d+|Question\d*|\[Q\d+\])/i)) {
        qText = line;
      } else if (line.match(/^[a-d][\):\.]/i)) {
        const letter = line[0].toUpperCase();
        const val = line.substring(2).trim();
        if (letter === "A") opts[0] = val;
        if (letter === "B") opts[1] = val;
        if (letter === "C") opts[2] = val;
        if (letter === "D") opts[3] = val;
      } else if (line.toLowerCase().startsWith("ans") || line.toLowerCase().startsWith("answer:")) {
        const ansStr = line.toUpperCase();
        if (ansStr.includes("A")) answer = 0;
        if (ansStr.includes("B")) answer = 1;
        if (ansStr.includes("C")) answer = 2;
        if (ansStr.includes("D")) answer = 3;
      } else if (line.toLowerCase().startsWith("exp") || line.toLowerCase().startsWith("explanation:")) {
        exp = line;
      } else if (!qText && line.length > 10 && !line.includes("---PAGE---")) {
        qText = line;
      }
    });

    if (qText && qText.length > 5) {
      parsedQuestions.push({
        id: `pdf_${Date.now()}_${idx}`,
        category: "PDF Workbook Sets",
        topic: currentTopic,
        difficulty: currentDifficulty,
        question: qText.replace(/^---PAGE---/g, "").trim(),
        options: opts,
        correctIndex: answer,
        explanation: exp,
        tags: [fileName, "PDF Extracted"],
      });
    }
  });

  return parsedQuestions;
}
