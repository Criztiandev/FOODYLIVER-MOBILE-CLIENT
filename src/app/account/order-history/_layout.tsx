import { Stack } from "expo-router";
import React from "react";

const RootScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="[status]" />
      <Stack.Screen name="details" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootScreen;
