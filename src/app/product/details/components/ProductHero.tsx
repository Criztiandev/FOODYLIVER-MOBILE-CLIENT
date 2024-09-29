import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import XStack from "@/components/stacks/XStack";
import { MessageSquare, Share2 } from "lucide-react-native";

const ProductHero = () => {
  return (
    <YStack>
      <YStack className="justify-center items-center relative">
        <View className="  flex-1 absolute top-0 left-0"></View>

        <Avatar size={200} />

        <XStack className=" w-full justify-between items-center px-2 ">
          <YStack className="space-y-1 justify-center items-center">
            <MessageSquare color="black" />
            <Text className="font-bold text-[16px]">Review</Text>
          </YStack>

          <YStack className="space-y-1 justify-center items-center mt-[32px]">
            <Text className="text-[18px] text-white font-bold p-2 text-center  bg-primary rounded-full border-2 border-white">
              4.1
            </Text>
            <Text className="font-bold text-[16px]">Rating</Text>
          </YStack>

          <YStack className="space-y-1 justify-center items-center">
            <Share2 color="black" />
            <Text className="font-bold text-[16px]">Share</Text>
          </YStack>
        </XStack>
      </YStack>

      <YStack className="jsutify-center items-center">
        <Text className="text-[52px] font-bold">Burger</Text>
        <Text className="text-xl font-bold opacity-50">PHP 900</Text>
      </YStack>
    </YStack>
  );
};

export default ProductHero;
