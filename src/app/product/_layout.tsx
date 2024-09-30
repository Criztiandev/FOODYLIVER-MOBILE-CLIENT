import React from "react";
import { Stack } from "expo-router";
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
