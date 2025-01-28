import { View, Text, StyleSheet } from "react-native";

export const EmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>No Available Products</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyStateContainer: {
    height: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#78716C",
    borderRadius: 6,
    opacity: 0.7,
  },
  emptyStateText: {
    fontWeight: "600",
    fontSize: 18,
  },
});
