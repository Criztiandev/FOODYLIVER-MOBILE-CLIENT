import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { PuzzleIcon } from "lucide-react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import PromotionalCard from "@/components/molecules/card/PromotionalCard";

const PromotionalList = () => {
  const result = {
    data: [],
  };
  return (
    <YStack className="px-2 mb-4 space-y-2">
      <View className="flex-row justify-between items-center ">
        <XStack className="items-center space-x-2">
          <PuzzleIcon color="black" size={18} />
          <Text className="text-lg font-semibold">Promotional</Text>
        </XStack>

        <Link href="/_sitemap">More</Link>
      </View>

      <XStack>
        {result?.data?.length > 0 ? (
          <XStack className="">
            <FlashList
              data={result.data}
              estimatedItemSize={10000}
              horizontal
              renderItem={({ item }: { item: any }) => (
                <PromotionalCard {...item} />
              )}
            />
          </XStack>
        ) : (
          <View className="h-[200px] flex-1 justify-center items-center border border-stone-400 w-full rounded-md opcity-70">
            <Text className="font-semibold text-lg">
              No Available Promotional
            </Text>
          </View>
        )}
      </XStack>
    </YStack>
  );
};

export default PromotionalList;
