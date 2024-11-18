import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import useLocalStorage from "@/hooks/utils/useLocalStorage";

const RootScreen = () => {
  const { getItem, setItem } = useLocalStorage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        const credentials = await getItem("user");

        if (credentials) {
          // User exists, navigate to home
          await setItem("user", credentials); // Refresh storage
          router.replace("/user/home");
        } else {
          // No user found, navigate to sign in
          router.replace("/auth/sign-in");
        }
      } catch (err: any) {
        setError(err);
        // On error, default to sign in page
        router.replace("/auth/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Using Redirect as a fallback, though the router.replace should handle navigation
  return <Redirect href="/auth/sign-in" />;
};

export default RootScreen;
