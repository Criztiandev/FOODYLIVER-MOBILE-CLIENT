import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import XStack from "@/components/stacks/XStack";
import { Heart, ShoppingCart } from "lucide-react-native";
import { Href, useRouter } from "expo-router";
import Avatar from "@/components/ui/Avatar";
import YStack from "@/components/stacks/YStack";
import { ProductItem } from "@/interface/product.interface";

const ProductCard = (props: ProductItem) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="relative"
      onPress={() => router.navigate(`/product/details/${props.id}` as Href)}
    >
      <XStack className=" absolute top-1  w-full  p-2 px-3 justify-between items-center flex-1 z-[99px]">
        <TouchableOpacity>
          <Heart color="black" size={28} />
        </TouchableOpacity>

        <View className="p-2 bg-white rounded-full">
          <Text className="text-lg font-bold">4.2</Text>
        </View>
      </XStack>

      <View className="bg-primary/20 relative p-4 flex-2 flex-1   rounded-md m-1 justify-center items-center space-y-4">
        <View className="mt-6">
          <Avatar size={100} />
        </View>
        <XStack className="items-start justify-between w-full">
          <YStack>
            <Text className="font-bold text-xl">
              {props?.name?.length < 12
                ? props.name
                : `${props?.name?.substring(0, 12)}..`}
            </Text>
            <Text className="text-[16px] font-bold">PHP {props.price}</Text>
          </YStack>

          <TouchableOpacity>
            <ShoppingCart size={24} color="black" />
          </TouchableOpacity>
        </XStack>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
