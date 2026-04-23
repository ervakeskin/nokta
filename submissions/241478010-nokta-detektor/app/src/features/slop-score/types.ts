export type ScoreAxisKey =
  | "originality"
  | "marketFit"
  | "technicalClarity"
  | "aiGeneratedRisk";

export interface AxisEvaluation {
  key: ScoreAxisKey;
  title: string;
  score: number;
  reasons: string[];
  guidance: string[];
}

export interface SlopAnalysisResult {
  pitch: string;
  slopScore: number;
  analyzedAt: string;
  axes: AxisEvaluation[];
}

export interface SlopHistoryItem extends SlopAnalysisResult {
  id: string;
}
