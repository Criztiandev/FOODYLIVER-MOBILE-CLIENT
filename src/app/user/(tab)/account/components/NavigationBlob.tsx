import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { IOrderNavigationDataset } from "../../../../../data/account.data";
import { useRouter } from "expo-router";

const NavigationBlob = ({ title, path, icon }: IOrderNavigationDataset) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(path)}
    >
      <View style={styles.content}>
        {icon}
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginRight: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  content: {
    alignItems: "center",
    gap: 4,
  },
});

export default NavigationBlob;
