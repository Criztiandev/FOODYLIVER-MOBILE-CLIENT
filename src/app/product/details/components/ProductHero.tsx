import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import XStack from "@/components/stacks/XStack";
import { MessageSquare, Share2 } from "lucide-react-native";
import { ProductItem } from "@/interface/product.interface";

interface Props extends Pick<ProductItem, "name" | "price" | "rating"> {}

const ProductHero = ({ name, price, rating }: Props) => {
  return (
    <YStack className="relative">
      <View
        className="w-full h-[40vh]  absolute top-0 bg-[#FCDEDE] "
        style={{ borderBottomEndRadius: 1000, borderBottomStartRadius: 1000 }}
      ></View>

      <YStack className="justify-center items-center relative mt-[64px]">
        <View className="  flex-1 absolute top-0 left-0"></View>

        <Avatar size={200} />

        <XStack className=" w-full justify-between  px-2 ">
          <YStack className="space-y-1 justify-center items-center">
            <MessageSquare color="black" />
            <Text className="font-bold text-[16px]">Review</Text>
          </YStack>

          <YStack className="space-y-1 justify-center items-center mt-[64px]">
            <Text className="text-[18px] text-white font-bold p-2 text-center  bg-primary rounded-full border-2 border-white">
              {rating || "0.0"}
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
        <Text className="text-[48px] font-bold text-center">
          {name || "Name"}
        </Text>
        <Text className="text-xl font-bold opacity-50">
          PHP {price || "0.00"}
        </Text>
      </YStack>
    </YStack>
  );
};

export default ProductHero;
