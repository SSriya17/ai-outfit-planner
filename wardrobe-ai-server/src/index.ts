import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { errorHandler } from "./middleware/errorHandler";
import { analyzeRouter } from "./routes/analyze";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3001);
const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:19006",
  process.env.FRONTEND_ORIGIN,
].filter((origin): origin is string => Boolean(origin));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin is not allowed by CORS."));
  },
}));
app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});
app.use("/analyze", analyzeRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`WardrobeAI inference server listening on port ${port}.`);
});
