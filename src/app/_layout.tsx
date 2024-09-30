import { Slot, Stack, useRootNavigationState } from "expo-router";
import "react-native-reanimated";
import { lightTheme } from "@/constant/light.theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppState } from "@/hooks/query/useAppState";
import useLoadFont from "@/hooks/query/useLoadFont";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNotifications } from "react-native-notificated";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { AppState } from "react-native";
import Toast from "react-native-toast-message";

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
                </Stack>
                <Toast />
            </NotificationsProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
