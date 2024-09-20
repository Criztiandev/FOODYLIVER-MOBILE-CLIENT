import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import ProtectedRoute from "@/components/routes/ProtectedRoute";

const RootLayout = () => {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="details" />
      </Stack>
    </ProtectedRoute>
  );
};

export default RootLayout;
