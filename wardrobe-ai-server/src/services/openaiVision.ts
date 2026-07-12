import OpenAI from "openai";

import { clothingAnalysisPrompt } from "../prompts/clothingPrompt";
import {
  HttpError,
  parseVisionAnalysis,
  type VisionAnalysis,
  type VisionImageInput,
  visionAnalysisJsonSchema,
} from "../types/vision";

const model = "gpt-4o-mini";
const timeoutMs = 20_000;

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new HttpError(500, "The AI service is not configured.");
  }

  return new OpenAI({ apiKey, maxRetries: 0, timeout: timeoutMs });
}

function toDataUrl(image: VisionImageInput): string {
  return `data:${image.mimeType};base64,${image.buffer.toString("base64")}`;
}

export async function analyzeClothingImage(image: VisionImageInput): Promise<VisionAnalysis> {
  try {
    const response = await getOpenAIClient().chat.completions.create({
      model,
      temperature: 0,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "clothing_analysis",
          strict: true,
          schema: visionAnalysisJsonSchema,
        },
      },
      messages: [
        { role: "system", content: clothingAnalysisPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze the garment in this image." },
            { type: "image_url", image_url: { url: toDataUrl(image), detail: "high" } },
          ],
        },
      ],
    });

    const content = response.choices[0]?.message.content;

    if (!content) {
      throw new HttpError(502, "The AI service returned an empty response.");
    }

    let parsedResponse: unknown;

    try {
      parsedResponse = JSON.parse(content);
    } catch {
      throw new HttpError(502, "The AI service returned invalid JSON.");
    }

    const analysis = parseVisionAnalysis(parsedResponse);

    if (!analysis) {
      throw new HttpError(502, "The AI service returned an invalid analysis.");
    }

    return analysis;
  } catch (error) {
    if (error instanceof HttpError) throw error;

    if (error instanceof OpenAI.APIConnectionTimeoutError) {
      throw new HttpError(504, "The AI service timed out.");
    }

    if (error instanceof OpenAI.APIConnectionError) {
      throw new HttpError(503, "The AI service is unavailable.");
    }

    if (error instanceof OpenAI.APIError) {
      throw new HttpError(502, "The AI service could not process the image.");
    }

    throw new HttpError(500, "The image analysis failed.");
  }
}
