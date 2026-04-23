import { SlopAnalysisResult } from "../types";
import { analyzePitchText } from "./scoring";

export function validatePitchInput(input: string): string | null {
  const trimmed = input.trim();

  if (!trimmed) {
    return "Please enter a pitch paragraph before analysis.";
  }

  if (trimmed.length < 40) {
    return "Pitch is too short. Add more context about user, market, and technical approach.";
  }

  return null;
}

export function runPitchAnalysis(input: string): SlopAnalysisResult {
  return analyzePitchText(input);
}
