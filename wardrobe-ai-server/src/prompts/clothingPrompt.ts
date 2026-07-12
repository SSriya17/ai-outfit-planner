export const clothingAnalysisPrompt = `You analyze a single clothing garment image.

Return only a valid JSON object matching this schema exactly:
{
  "category": "string",
  "material": "string",
  "dominantColor": "string",
  "pattern": "string",
  "fit": "string",
  "season": "string",
  "style": "string",
  "confidence": 0.0,
  "tags": ["string"]
}

Do not include markdown, explanations, or additional keys. Confidence must be a number from 0 through 1.`;
