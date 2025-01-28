import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="list" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="delivery" />
      <Stack.Screen name="track" />
      <Stack.Screen name="forced" />
    </Stack>
  );
};

export default RootLayout;
