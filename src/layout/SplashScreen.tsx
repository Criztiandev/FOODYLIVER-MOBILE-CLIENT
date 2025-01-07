import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import { Image } from "expo-image";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import Button from "@/components/ui/Button";

interface Props {
  setSplash: (value: boolean) => void;
}

const SplashScreen = ({ setSplash }: Props) => {
  const { setItem } = useLocalStorage();

  const handleLogin = async () => {
    try {
      await setItem("splash", "true");
      setSplash(false);
    } catch (error) {
      console.error("Error saving splash state:", error);
      Alert.alert("Error", "Something went wrong. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <YStack className="flex-1 justify-center p-6">
      <YStack className="items-center space-y-10">
        <YStack className="items-center">
          <Text className="text-5xl font-bold text-primary tracking-wide">
            J&B
          </Text>
          <Text className="text-4xl text-primary font-bold">Food Delivery</Text>
        </YStack>

        <View className="h-64 w-full">
          <Image
            source={require("@/assets/images/splash/drawing-hero.png")}
            contentFit="contain"
            className="flex-1"
          />
        </View>

        <Text className="text-3xl font-bold text-center px-8 text-primary">
          Discover your next favorite meal with us
        </Text>

        <Button onPress={handleLogin}>
          <Text className="text-white font-bold text-xl text-center w-full px-8">
            Get Started
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default SplashScreen;
