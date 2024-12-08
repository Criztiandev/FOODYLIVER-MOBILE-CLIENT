import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { PuzzleIcon } from "lucide-react-native";

import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import CategoriesCard from "@/components/molecules/card/CategoriesCard";
import { useQuery } from "@tanstack/react-query";
import { useFetchCategories } from "@/hooks/categories/query";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";

const TopCategoriesList = () => {
  const { isLoading, isError, error, data: result } = useFetchCategories();

  if (isLoading)
    return (
      <View className="px-2 my-4 space-y-2">
        <View className="flex-row justify-between items-center mb-2 ">
          <XStack className="items-center space-x-2">
            <PuzzleIcon color="black" size={18} />
            <Text className="text-lg font-semibold text-primary">
              Top Categories
            </Text>
          </XStack>
        </View>

        <SectionLoadingScreen />
      </View>
    );
  if (isError) {
    return (
      <View className="px-2 space-y-3 my-4 ">
        <XStack className="items-center space-x-2">
          <PuzzleIcon color="black" size={18} />
          <Text className="text-lg font-semibold text-primary">
            Top Categories
          </Text>
        </XStack>

        <View className="h-[200px] bg-stone-200">
          <View className=" h-full flex-1 justify-center items-center border border-stone-400 w-full rounded-md opcity-70 ">
            <Text className="font-semibold text-lg">Something went wrong</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <YStack className="px-2 my-4 space-y-2">
      <View className="flex-row justify-between items-center ">
        <XStack className="items-center space-x-2">
          <PuzzleIcon color="black" size={18} />
          <Text className="text-lg font-semibold text-primary">
            Top Categories
          </Text>
        </XStack>

        <Link href="/_sitemap">More</Link>
      </View>

      {result?.data?.length > 0 ? (
        <XStack className="">
          <FlashList
            data={result.data}
            estimatedItemSize={10000}
            horizontal
            renderItem={({ item }: { item: Categories }) => (
              <CategoriesCard {...item} />
            )}
          />
        </XStack>
      ) : (
        <View className="h-[200px]">
          <View className=" h-full flex-1 justify-center items-center border border-stone-400 w-full rounded-md opcity-70 ">
            <Text className="font-semibold text-lg">
              No Available Categories
            </Text>
          </View>
        </View>
      )}
    </YStack>
  );
};

export default TopCategoriesList;
