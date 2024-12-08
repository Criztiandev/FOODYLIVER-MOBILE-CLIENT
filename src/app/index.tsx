import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import useLocalStorage from "@/hooks/utils/useLocalStorage";

type UserCredentials = {
  id: string;
  // Add other user properties
};

type AppState = {
  isLoading: boolean;
  credentials: UserCredentials | null;
};

const INITIAL_STATE: AppState = {
  isLoading: true,
  credentials: null,
};

const RootScreen = () => {
  const { getItem, setItem } = useLocalStorage();
  const router = useRouter();
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const credentials = await getItem<UserCredentials>("user");

        if (credentials) {
          // Refresh storage with existing credentials
          await setItem("user", credentials);
          router.replace("/user/home");
        } else {
          router.replace("/auth/sign-in");
        }
      } catch {
        // On any error, redirect to sign in
        router.replace("/auth/sign-in");
      } finally {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initializeApp();
  }, []);

  // Show loading screen while checking credentials
  if (state.isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Fallback redirect
  return <Redirect href="/auth/sign-in" />;
};

export default RootScreen;
