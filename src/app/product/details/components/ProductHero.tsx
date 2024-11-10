import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { Box, Star, Tag } from "lucide-react-native";
import { ProductItem } from "@/interface/product.interface";
import { Image } from "expo-image";

interface Props
  extends Pick<
    ProductItem,
    "name" | "price" | "rating" | "stocks" | "description"
  > {}

const ProductHero = ({ name, price, rating, stocks, description }: Props) => {
  return (
    <View className=" w-full  mb-4">
      <Image
        source={require("@/assets/images/cooking-img.png")}
        className="w-full h-[300px]"
      />

      <YStack className="py-4 space-y-4">
        <Text className="text-3xl font-bold">{name || "Burger"}</Text>
        <XStack className="space-x-4 items-center">
          <XStack className="items-center space-x-2">
            <Star color="#EA9937" />
            <Text className="text-sm font-semibold text-stone-500">
              {rating} Ratings
            </Text>
          </XStack>

          <XStack className="items-center space-x-2">
            <Tag color="#EA9937" />
            <Text className="text-sm font-semibold text-stone-500">
              {price} Price
            </Text>
          </XStack>

          <XStack className="items-center space-x-2">
            <Box color="#EA9937" />
            <Text className="text-sm font-semibold text-stone-500">
              {stocks} Left
            </Text>
          </XStack>
        </XStack>
      </YStack>

      <YStack>
        <Text>{description}</Text>
      </YStack>
    </View>
  );
};

export default ProductHero;
