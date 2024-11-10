import { Stack } from "expo-router";
import React from "react";

const RootScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="new-address" />
    </Stack>
  );
};

export default RootScreen;
