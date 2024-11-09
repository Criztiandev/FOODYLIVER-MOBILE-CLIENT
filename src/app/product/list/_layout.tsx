import ProtectedRoute from "@/components/routes/ProtectedRoute";
import { Stack } from "expo-router";
import React from "react";

const RootScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="[status]" />
    </Stack>
  );
};

export default RootScreen;
