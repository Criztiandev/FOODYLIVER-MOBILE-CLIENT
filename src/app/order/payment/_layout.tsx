import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="gcash" />
    </Stack>
  );
};

export default _layout;
