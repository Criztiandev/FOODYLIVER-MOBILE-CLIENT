import YStack from "@/components/stacks/YStack";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Text, View } from "react-native";

const jokes = [
  "Seems our reviews are on vacation! 🏖️",
  "Our reviews are as empty as a programmer's coffee cup at 8am ☕",
  "Houston, we have no reviews! 🚀",
  "Plot twist: all our reviewers got abducted by aliens! 👽",
] as const;

const EmptyReview = () => {
  // Use useMemo to keep the same joke during re-renders
  const randomJoke = useMemo(
    () => jokes[Math.floor(Math.random() * jokes.length)],
    [] // Empty dependency array means this will be calculated once on mount
  );

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
          {randomJoke}
        </Text>
        <Text className="text-sm text-center text-gray-500">
          Be the first to break the silence and share your thoughts!
        </Text>
      </YStack>
    </YStack>
  );
};

// Memoize the entire component since it's static once rendered
export default React.memo(EmptyReview);
