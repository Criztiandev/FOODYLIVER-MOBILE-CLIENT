import { Stack } from "expo-router";
import React from "react";

const RootScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default RootScreen;
