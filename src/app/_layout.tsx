import { Stack } from "expo-router";
import "react-native-reanimated";
import { lightTheme } from "@/constant/light.theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppState } from "@/hooks/query/useAppState";
import useLoadFont from "@/hooks/query/useLoadFont";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNotifications } from "react-native-notificated";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import Toast from "react-native-toast-message";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import { useEffect, useState } from "react";
import SplashScreen from "@/layout/SplashScreen";
import LoadingScreen from "@/layout/screen/LoadingScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
const client = new QueryClient();

export default function RootLayout() {
  const { NotificationsProvider } = createNotifications();

  // font
  useLoadFont();

  // States
  useAppState();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider initialTheme={lightTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <NotificationsProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="auth" />
                <Stack.Screen name="user" />
                <Stack.Screen name="product" />
                <Stack.Screen name="cart" />
                <Stack.Screen name="account" />
              </Stack>
              <Toast />
            </NotificationsProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
