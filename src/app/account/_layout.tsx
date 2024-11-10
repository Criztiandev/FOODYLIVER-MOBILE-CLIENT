import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";
import ProtectedRoute from "@/components/routes/ProtectedRoute";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="update-profile" />
      <Stack.Screen name="address" />
      <Stack.Screen name="link-gcash" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="order-history" />
    </Stack>
  );
};

export default RootLayout;
