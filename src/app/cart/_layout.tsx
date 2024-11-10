import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";

import ProtectedRoute from "@/components/routes/ProtectedRoute";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="list" />
    </Stack>
  );
};

export default RootLayout;
