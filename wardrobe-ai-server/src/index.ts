import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { errorHandler } from "./middleware/errorHandler";
import { analyzeRouter } from "./routes/analyze";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use("/analyze", analyzeRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`WardrobeAI inference server listening on port ${port}.`);
});
