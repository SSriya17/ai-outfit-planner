import type { ErrorRequestHandler } from "express";
import multer from "multer";

import { HttpError } from "../types/vision";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof multer.MulterError) {
    response.status(413).json({ error: "The image exceeds the 10 MB upload limit." });
    return;
  }

  response.status(500).json({ error: "An unexpected server error occurred." });
};
