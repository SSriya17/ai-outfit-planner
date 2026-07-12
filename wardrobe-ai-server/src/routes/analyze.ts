import { Router } from "express";
import multer from "multer";

import { analyzeClothingImage } from "../services/openaiVision";
import { HttpError } from "../types/vision";

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_request, file, callback) => {
    if (!acceptedImageTypes.has(file.mimetype)) {
      callback(new HttpError(415, "Only JPEG, PNG, and WebP images are supported."));
      return;
    }

    callback(null, true);
  },
});

export const analyzeRouter = Router();

analyzeRouter.post("/", upload.single("image"), async (request, response, next) => {
  try {
    if (!request.file) {
      throw new HttpError(400, "An image file is required.");
    }

    const analysis = await analyzeClothingImage({
      buffer: request.file.buffer,
      mimeType: request.file.mimetype,
    });

    response.status(200).json(analysis);
  } catch (error) {
    next(error);
  }
});
