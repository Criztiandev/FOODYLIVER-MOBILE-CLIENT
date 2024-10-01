import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[status]" />
    </Stack>
  );
};

export default RootLayout;
