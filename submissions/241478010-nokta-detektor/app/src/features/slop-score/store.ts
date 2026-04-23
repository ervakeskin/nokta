import { create } from "zustand";
import { runPitchAnalysis, validatePitchInput } from "./services/analysis";
import { loadAnalysisHistory, saveAnalysisHistory } from "./services/storage";
import { SlopAnalysisResult, SlopHistoryItem } from "./types";

interface SlopScoreState {
  pitch: string;
  loading: boolean;
  error: string | null;
  result: SlopAnalysisResult | null;
  history: SlopHistoryItem[];
  setPitch: (value: string) => void;
  initialize: () => Promise<void>;
  analyze: () => Promise<void>;
  clearHistory: () => Promise<void>;
}

function makeHistoryId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export const useSlopScoreStore = create<SlopScoreState>((set, get) => ({
  pitch: "",
  loading: false,
  error: null,
  result: null,
  history: [],
  setPitch: (value) => set({ pitch: value }),
  initialize: async () => {
    const history = await loadAnalysisHistory();
    set({ history });
  },
  analyze: async () => {
    const { pitch, history } = get();
    const validationError = validatePitchInput(pitch);
    if (validationError) {
      set({ error: validationError });
      return;
    }

    set({ loading: true, error: null });
    const result = runPitchAnalysis(pitch);
    const nextHistory: SlopHistoryItem[] = [
      { id: makeHistoryId(), ...result },
      ...history,
    ].slice(0, 10);

    await saveAnalysisHistory(nextHistory);
    set({ loading: false, result, history: nextHistory });
  },
  clearHistory: async () => {
    await saveAnalysisHistory([]);
    set({ history: [] });
  },
}));
