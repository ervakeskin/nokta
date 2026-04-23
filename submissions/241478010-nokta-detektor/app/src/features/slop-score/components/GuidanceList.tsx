import { StyleSheet, Text, View } from "react-native";

interface GuidanceListProps {
  guidance: string[];
}

export function GuidanceList({ guidance }: GuidanceListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Improvement prompts</Text>
      {guidance.map((item) => (
        <Text key={item} style={styles.item}>
          - {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  item: {
    fontSize: 13,
    lineHeight: 18,
    color: "#1e3a8a",
    marginBottom: 2,
  },
});
