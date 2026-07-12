import { Router } from "express";
import multer from "multer";

import { analyzeClothingImage } from "../services/openaiVision";
import { HttpError } from "../types/vision";

const acceptedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_request, file, callback) => {
    console.log("FILE TYPE:", file.mimetype);

    if (!acceptedImageTypes.has(file.mimetype)) {
      callback(
        new HttpError(
          415,
          "Only JPEG, PNG, and WebP images are supported.",
        ),
      );
      return;
    }

    callback(null, true);
  },
});

export const analyzeRouter = Router();

analyzeRouter.post("/", upload.single("image"), async (request, response, next) => {
  console.log("=== /analyze hit ===");

  try {
    console.log("request.file:", !!request.file);

    if (!request.file) {
      throw new HttpError(400, "An image file is required.");
    }

    console.log("Calling analyzeClothingImage...");

    const analysis = await analyzeClothingImage({
      buffer: request.file.buffer,
      mimeType: request.file.mimetype,
    });

    console.log("Analysis complete.");

    response.json(analysis);
  } catch (error) {
    console.error("ROUTE ERROR:");
    console.error(error);
    next(error);
  }
});