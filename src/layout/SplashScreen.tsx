import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import YStack from "@/components/stacks/YStack";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import useLocalStorage from "@/hooks/utils/useLocalStorage";

interface Props {
  setSplash: (value: boolean) => void;
}

const SplashScreen = ({ setSplash }: Props) => {
  const router = useRouter();
  const { setItem } = useLocalStorage();

  const handleLogin = async () => {
    try {
      await setItem("splash", "true");
      setSplash(false);
    } catch (error) {
      console.error("Error in handleLogin:", error);
      Alert.alert(
        "Error",
        "There was a problem logging in. Please try again.",
        [{ text: "OK" }]
      );
    }
  };
  return (
    <YStack className="p-4 flex-1 justify-center ">
      <YStack className="justify-center items-center space-y-[32px]">
        <YStack className="justify-center items-center mb-8">
          <Text className="text-4xl font-bold text-primary">J&B</Text>
          <Text className="text-4xl font-bold text-primary">Food Delivery</Text>
        </YStack>

        <View style={{ minHeight: 250, width: "100%" }}>
          <Image
            source={require("@/assets/images/splash/drawing-hero.png")}
            className="flex-1"
            style={{ resizeMode: "contain" }}
          />
        </View>

        <YStack>
          <Text className="font-bold text-2xl px-14 text-center">
            Discover your next favorite meal with us
          </Text>
        </YStack>

        <TouchableOpacity
          className="bg-primary p-4 w-full justify-center items-center rounded-md"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-2xl">LOGIN</Text>
        </TouchableOpacity>
      </YStack>
    </YStack>
  );
};

export default SplashScreen;
