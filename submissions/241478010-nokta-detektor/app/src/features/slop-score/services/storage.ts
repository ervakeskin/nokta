import AsyncStorage from "@react-native-async-storage/async-storage";
import { SlopHistoryItem } from "../types";

const HISTORY_KEY = "@nokta-track2/slop-history";

export async function loadAnalysisHistory(): Promise<SlopHistoryItem[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as SlopHistoryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveAnalysisHistory(history: SlopHistoryItem[]): Promise<void> {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
