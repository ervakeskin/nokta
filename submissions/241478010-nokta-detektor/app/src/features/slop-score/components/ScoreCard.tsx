import { StyleSheet, Text, View } from "react-native";
import { AxisEvaluation } from "../types";

interface ScoreCardProps {
  axis: AxisEvaluation;
}

function getScoreColor(score: number): string {
  if (score >= 75) {
    return "#0f766e";
  }
  if (score >= 50) {
    return "#b45309";
  }
  return "#b91c1c";
}

export function ScoreCard({ axis }: ScoreCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{axis.title}</Text>
        <Text style={[styles.score, { color: getScoreColor(axis.score) }]}>
          {axis.score}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  score: {
    fontSize: 18,
    fontWeight: "700",
  },
});
