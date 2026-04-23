import { StyleSheet, Text, View } from "react-native";

interface ReasonListProps {
  title: string;
  reasons: string[];
}

export function ReasonList({ title, reasons }: ReasonListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {reasons.map((reason) => (
        <Text key={reason} style={styles.item}>
          - {reason}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  item: {
    fontSize: 13,
    lineHeight: 18,
    color: "#374151",
    marginBottom: 2,
  },
});
