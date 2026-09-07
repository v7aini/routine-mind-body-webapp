// Intelligent Question Deduplication Utility
// Identifies questions that share the same grammatical/problem template where only numeric values differ
// Ensures no question template/pattern appears more than `maxOccurrences` (default 2 times).

/**
 * Normalizes question text into a canonical structural signature
 * by stripping prefix tags and replacing numeric amounts/percentages/units.
 */
export function getQuestionStructuralSignature(questionText = "") {
  if (!questionText) return "";

  let normalized = questionText
    // Remove question header prefixes like "[Q1 - Partnership Easy]" or "Q1:"
    .replace(/^\[.*?\]\s*/i, "")
    .replace(/^(q\d*|question\d*|problem\d*)\s*[:.-]\s*/i, "")
    // Remove rupee symbols and other currency signs
    .replace(/[₹$€£]/g, "")
    // Replace all numbers (integers, decimals, fractions) with a canonical token
    .replace(/\b\d+(\.\d+)?\b/g, "__NUM__")
    // Normalize spaces and lowercase
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  return normalized;
}

/**
 * Filters a list of questions, ensuring that any question template
 * with only different values is included AT MOST `maxOccurrences` times (default 2).
 */
export function deduplicateQuestions(questions = [], maxOccurrences = 2) {
  if (!Array.isArray(questions)) return [];

  const templateCounts = new Map();
  const seenExactIds = new Set();
  const filtered = [];

  for (const q of questions) {
    if (!q || !q.question) continue;

    // Skip exact ID duplicates
    if (q.id && seenExactIds.has(q.id)) continue;
    if (q.id) seenExactIds.add(q.id);

    const signature = getQuestionStructuralSignature(q.question);

    // If signature is too short/generic, use the question as-is
    const key = signature.length > 15 ? signature : q.question.toLowerCase().trim();

    const currentCount = templateCounts.get(key) || 0;

    if (currentCount < maxOccurrences) {
      templateCounts.set(key, currentCount + 1);
      filtered.push(q);
    }
  }

  return filtered;
}
