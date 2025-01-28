import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[transaction_id]" />
    </Stack>
  );
};

export default RootLayout;
