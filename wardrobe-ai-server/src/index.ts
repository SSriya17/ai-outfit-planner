import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { errorHandler } from "./middleware/errorHandler";
import { analyzeRouter } from "./routes/analyze";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3001);
function normalizeOrigin(origin: string): string {
  return origin.replace(/\/+$/, "");
}

const allowedOrigins = new Set([
  "http://localhost:8081",
  "http://localhost:19006",
  "https://ai-outfit-planner-five.vercel.app",
  process.env.FRONTEND_ORIGIN,
].filter((origin): origin is string => Boolean(origin)).map(normalizeOrigin));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin is not allowed by CORS."));
  },
}));
app.use(express.json({ limit: "1mb" }));
app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});
app.use("/analyze", analyzeRouter);
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`WardrobeAI inference server listening on port ${port}.`);
});
