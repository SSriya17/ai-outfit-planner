import { useEffect, useState } from "react";

import type { VisionReadyImage } from "../services/imagePicker";
import { analyzeGarmentImage, type VisionAnalysis } from "../services/visionService";

interface UseVisionAnalysisResult {
  readonly analysis: VisionAnalysis | null;
  readonly isAnalyzing: boolean;
  readonly errorMessage: string | null;
}

const analysisErrorMessage = "We couldn't analyze that garment. Please try again.";

export function useVisionAnalysis(image: VisionReadyImage | null): UseVisionAnalysisResult {
  const [analysis, setAnalysis] = useState<VisionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    if (!image) {
      setAnalysis(null);
      setErrorMessage(null);
      setIsAnalyzing(false);
      return () => {
        isCurrent = false;
      };
    }

    setAnalysis(null);
    setErrorMessage(null);
    setIsAnalyzing(true);

    void analyzeGarmentImage(image)
      .then((result) => {
        if (isCurrent) setAnalysis(result);
      })
      .catch((error: unknown) => {
        if (isCurrent) setErrorMessage(error instanceof Error ? error.message : analysisErrorMessage);
      })
      .finally(() => {
        if (isCurrent) setIsAnalyzing(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [image]);

  return { analysis, isAnalyzing, errorMessage };
}
