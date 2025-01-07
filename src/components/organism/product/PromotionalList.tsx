import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { PuzzleIcon } from "lucide-react-native";
import { FlashList } from "@shopify/flash-list";
import PromotionalCard from "@/components/molecules/card/PromotionalCard";
import { useFetchPromotional } from "@/hooks/promotional/query";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";

interface Promotion {
  id: string;
  name: string;
  description: string;
  image: string;
  // Add other promotion properties as needed
}

const PromotionalHeader = () => (
  <XStack className="items-center space-x-2">
    <PuzzleIcon color="black" size={18} />
    <Text className="text-lg font-semibold text-primary">Promotional</Text>
  </XStack>
);

const EmptyState = () => (
  <View className="h-[200px] flex-1 justify-center items-center border border-stone-400 w-full rounded-md opacity-70">
    <Text className="font-semibold text-lg">No Available Promotions</Text>
  </View>
);

const ErrorState = () => (
  <View className="h-[200px] bg-stone-200">
    <View className="h-full flex-1 justify-center items-center border border-stone-400 w-full rounded-md opacity-70">
      <Text className="font-semibold text-lg">Something went wrong</Text>
    </View>
  </View>
);

const PromotionalList = () => {
  const { isLoading, isError, data: result } = useFetchPromotional();

  const getRandomPromotions = (
    promotions: Promotion[] = [],
    count: number = 3
  ): Promotion[] => {
    if (!promotions?.length) return [];

    const safeCount = Math.min(count, promotions.length);
    const shuffled = [...promotions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, safeCount);
  };

  if (isLoading) {
    return (
      <View className="px-2 mb-4 space-y-2">
        <View className="flex-row justify-between items-center mb-2">
          <PromotionalHeader />
        </View>
        <SectionLoadingScreen />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="px-2 space-y-3">
        <PromotionalHeader />
        <ErrorState />
      </View>
    );
  }

  const randomPromotions = getRandomPromotions(result?.data);

  console.log(randomPromotions);

  return (
    <YStack className="px-2 mb-4 space-y-2">
      <View className="flex-row justify-between items-center">
        <PromotionalHeader />
      </View>

      <XStack>
        {result?.data?.length > 0 ? (
          <FlashList
            data={randomPromotions}
            estimatedItemSize={200}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: { item: Promotion }) => (
              <PromotionalCard
                {...item}
                name={item.name}
                thumbnail={item.image}
              />
            )}
          />
        ) : (
          <EmptyState />
        )}
      </XStack>
    </YStack>
  );
};

export default PromotionalList;
