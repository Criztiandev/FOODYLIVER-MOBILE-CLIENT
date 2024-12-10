import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const EmptyReview = () => {
  const router = useRouter();

  const generateRandomJoke = () => {
    const jokes = [
      "Seems our reviews are on vacation! 🏖️",
      "Our reviews are as empty as a programmer's coffee cup at 8am ☕",
      "Houston, we have no reviews! 🚀",
      "Plot twist: all our reviewers got abducted by aliens! 👽",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  };

  return (
    <YStack className="flex-1 justify-center items-center space-y-6 p-4">
      <Image
        className="w-full h-[200px]"
        contentFit="contain"
        source={require("@/assets/images/Girl-magnify.png")}
      />
      <YStack className="space-y-4 justify-center items-center max-w-[300px]">
        <Text className="text-3xl font-bold text-center">
          Cricket Sounds 🦗
        </Text>
        <Text className="text-base text-center text-gray-600">
          {generateRandomJoke()}
        </Text>
        <Text className="text-sm text-center text-gray-500">
          Be the first to break the silence and share your thoughts!
        </Text>
        <View className="flex-row space-x-3">
          <Button className="px-6 bg-gray-100" onPress={() => router.back()}>
            <Text className="text-gray-800 font-semibold text-base">
              Go Back
            </Text>
          </Button>
        </View>
      </YStack>
    </YStack>
  );
};

export default EmptyReview;
