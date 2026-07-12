import { clothingAnalysisPrompt } from "../prompts/clothingPrompt";
import { HttpError, parseVisionAnalysis, type VisionAnalysis, type VisionImageInput, visionAnalysisJsonSchema } from "../types/vision";

const model = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";

function apiKey(): string { const value = process.env.GEMINI_API_KEY; if (!value) throw new HttpError(500, "The AI service is not configured."); return value; }
function errorMessage(value: unknown): string { if (!value || typeof value !== "object") return "Gemini could not process the image."; const error = (value as { readonly error?: { readonly message?: unknown } }).error; return typeof error?.message === "string" ? error.message : "Gemini could not process the image."; }

export async function analyzeClothingImage(image: VisionImageInput): Promise<VisionAnalysis> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey() }, signal: controller.signal, body: JSON.stringify({ contents: [{ parts: [{ text: clothingAnalysisPrompt }, { inline_data: { mime_type: image.mimeType, data: image.buffer.toString("base64") } }] }], generationConfig: { responseMimeType: "application/json", responseJsonSchema: visionAnalysisJsonSchema } }) });
    const payload: unknown = await response.json();
    if (!response.ok) { const message = errorMessage(payload); console.error({ provider: "gemini", status: response.status, message, payload }); throw new HttpError(response.status, message); }
    const content = (payload as { readonly candidates?: readonly { readonly content?: { readonly parts?: readonly { readonly text?: string }[] } }[] }).candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new HttpError(502, "Gemini returned an empty response.");
    let parsed: unknown;
    try { parsed = JSON.parse(content); } catch { throw new HttpError(502, "Gemini returned invalid JSON."); }
    const analysis = parseVisionAnalysis(parsed);
    if (!analysis) throw new HttpError(502, "Gemini returned an invalid analysis.");
    return analysis;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") throw new HttpError(504, "Gemini timed out.");
    if (error instanceof Error) throw new HttpError(503, error.message);
    throw new HttpError(500, "The AI service failed.");
  } finally { clearTimeout(timeout); }
}
