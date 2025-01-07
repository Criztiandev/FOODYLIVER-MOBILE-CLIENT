import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { PuzzleIcon } from "lucide-react-native";
import { FlashList } from "@shopify/flash-list";
import { useFetchCategories } from "@/hooks/categories/query";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";
import CategoriesCard from "@/components/molecules/card/CategoriesCard";

interface Category {
  id: string;
  name: string;
  image: string;
  thumbnail: string;
  // Add other properties that CategoriesCard expects
}

const CategoryHeader = () => (
  <XStack className="items-center space-x-2">
    <PuzzleIcon color="black" size={18} />
    <Text className="text-lg font-semibold text-primary">Top Categories</Text>
  </XStack>
);

const EmptyState = () => (
  <View className="h-[200px]">
    <View className="h-full flex-1 justify-center items-center border border-stone-400 w-full rounded-md opacity-70">
      <Text className="font-semibold text-lg">No Available Categories</Text>
    </View>
  </View>
);

const ErrorState = () => (
  <View className="h-[200px] bg-stone-200">
    <View className="h-full flex-1 justify-center items-center border border-stone-400 w-full rounded-md opacity-70">
      <Text className="font-semibold text-lg">Something went wrong</Text>
    </View>
  </View>
);

const TopCategoriesList = () => {
  const { isLoading, isError, data: result } = useFetchCategories();

  if (isLoading) {
    return (
      <View className="px-2 my-4 space-y-2">
        <View className="flex-row justify-between items-center mb-2">
          <CategoryHeader />
        </View>
        <SectionLoadingScreen />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="px-2 space-y-3 my-4">
        <CategoryHeader />
        <ErrorState />
      </View>
    );
  }

  return (
    <YStack className="px-2 my-4 space-y-2">
      <View className="flex-row justify-between items-center">
        <CategoryHeader />
      </View>

      {result?.data?.length > 0 ? (
        <XStack>
          <FlashList<Category>
            data={result.data}
            estimatedItemSize={100}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoriesCard {...item} thumbnail={item.image} />
            )}
          />
        </XStack>
      ) : (
        <EmptyState />
      )}
    </YStack>
  );
};

export default TopCategoriesList;
