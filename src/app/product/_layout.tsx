import React from "react";
import { Stack } from "expo-router";
import ProtectedRoute from "@/components/routes/ProtectedRoute";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="details" />
      <Stack.Screen name="list" />
    </Stack>
  );
};

export default RootLayout;
