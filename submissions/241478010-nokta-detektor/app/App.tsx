import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GuidanceList } from "./src/features/slop-score/components/GuidanceList";
import { ReasonList } from "./src/features/slop-score/components/ReasonList";
import { ScoreCard } from "./src/features/slop-score/components/ScoreCard";
import { useSlopScoreStore } from "./src/features/slop-score/store";

export default function App() {
  const {
    pitch,
    setPitch,
    result,
    loading,
    error,
    history,
    initialize,
    analyze,
    clearHistory,
  } = useSlopScoreStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>NOKTA Track 2 - Slop Score</Text>
        <Text style={styles.subheading}>
          Paste a pitch paragraph and get market-claim checks with score reasons.
        </Text>

        <TextInput
          value={pitch}
          onChangeText={setPitch}
          multiline
          textAlignVertical="top"
          placeholder="Example: We help university students reduce monthly spending by 20% using personalized budget nudges and campus-specific discount discovery..."
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.button, loading ? styles.buttonDisabled : undefined]}
          disabled={loading}
          onPress={() => {
            void analyze();
          }}
        >
          <Text style={styles.buttonText}>Analyze pitch</Text>
        </Pressable>

        {loading ? <ActivityIndicator size="small" color="#2563eb" /> : null}

        {result ? (
          <View style={styles.resultsWrap}>
            <Text style={styles.totalScore}>Slop score: {result.slopScore}/100</Text>
            {result.axes.map((axis) => (
              <View key={axis.key}>
                <ScoreCard axis={axis} />
                <ReasonList title={`${axis.title} reasons`} reasons={axis.reasons} />
                <GuidanceList guidance={axis.guidance} />
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.historyWrap}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recent analyses</Text>
            <Pressable
              onPress={() => {
                void clearHistory();
              }}
            >
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>
          </View>

          {history.length === 0 ? (
            <Text style={styles.emptyHistory}>No analysis history yet.</Text>
          ) : (
            history.map((item) => (
              <View key={item.id} style={styles.historyCard}>
                <Text style={styles.historyScore}>{item.slopScore}/100</Text>
                <Text style={styles.historyPitch} numberOfLines={3}>
                  {item.pitch}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    padding: 16,
    paddingBottom: 28,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 14,
    lineHeight: 20,
  },
  input: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#111827",
    marginBottom: 10,
  },
  error: {
    color: "#b91c1c",
    marginBottom: 8,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  resultsWrap: {
    marginTop: 8,
  },
  totalScore: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  historyWrap: {
    marginTop: 8,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },
  clearText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 13,
  },
  emptyHistory: {
    color: "#6b7280",
    fontSize: 13,
  },
  historyCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 8,
  },
  historyScore: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  historyPitch: {
    fontSize: 13,
    color: "#4b5563",
    lineHeight: 18,
  },
});
