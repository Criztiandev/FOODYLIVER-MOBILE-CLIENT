import ProtectedRoute from "@/components/routes/ProtectedRoute";
import { Stack } from "expo-router";
import React from "react";

const RootScreen = () => {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <Stack>
        <Stack.Screen name="[status]" />
      </Stack>
    </ProtectedRoute>
  );
};

export default RootScreen;
