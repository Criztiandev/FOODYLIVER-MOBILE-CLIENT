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
    "name" | "price" | "rating" | "stocks" | "description" | "thumbnail"
  > {}

const ProductHero = ({
  name,
  price,
  stocks,
  description,
  thumbnail,
}: Props) => {
  console.log(thumbnail);
  return (
    <View className=" w-full  mb-4 px-2">
      <View className="">
        <Image
          source={{
            uri: thumbnail
              ? `https://jandbfoodapp.site/storage/${thumbnail}`
              : "https://placehold.co/600x400",
          }}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#F4891F",
          }}
        />
      </View>

      <YStack className="py-4 space-y-4">
        <Text className="text-3xl font-bold capitalize">
          {name || "Burger"}
        </Text>
        <XStack className="space-x-4 items-center">
          <XStack className="items-center space-x-2">
            <Star color="#EA9937" />
            <Text className="text-sm font-semibold text-stone-500">
              5 Ratings
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
