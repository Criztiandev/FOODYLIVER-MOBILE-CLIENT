import { View, Text, StyleSheet } from "react-native";

export const ErrorState = () => (
  <View style={styles.errorContainer}>
    <View style={styles.errorInnerContainer}>
      <Text style={styles.errorText}>Something went wrong</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    height: 200,
    backgroundColor: "#E5E7EB",
  },
  errorInnerContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#78716C",
    borderRadius: 6,
    opacity: 0.7,
  },
  errorText: {
    fontWeight: "600",
    fontSize: 18,
  },
});
