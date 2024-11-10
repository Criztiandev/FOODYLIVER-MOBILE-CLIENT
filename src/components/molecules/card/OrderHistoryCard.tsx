import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Avatar from "@/components/ui/Avatar";
import { useRouter } from "expo-router";
import useCartStore from "@/state/useCartStore";
import { ProductItem } from "@/interface/product.interface";

const OrderHistoryCard = () => {
  const router = useRouter();
  const { addProduct } = useCartStore();

  const handleAddtoCart = (product: ProductItem) => {
    addProduct(product, 1);
    router.push("/cart/list");
  };

  return (
    <YStack className="space-y-2 rounded-md border border-[#bc0505] p-2">
      <YStack className="mb-4">
        <XStack className="space-x-2">
          <Avatar size={64} />
          <YStack className=" flex-shrink space-y-2">
            <Text className="text-base font-semibold text-primary flex-shrink">
              Burger with extra patty, Shanghai, Pizza Pe...
            </Text>

            <YStack className="">
              <XStack className="justify-end items-center space-x-2">
                <Text className="text-end font-bold">Delivered On:</Text>
                <Text className=" font-bold">October 10, 2024</Text>
              </XStack>
              <XStack className="justify-end items-center space-x-2">
                <Text className="text-end font-bold">Order Total:</Text>
                <Text className="text-[#FF7C02] font-bold">PHP 616.00</Text>
              </XStack>
            </YStack>
          </YStack>
        </XStack>
      </YStack>

      <XStack className="justify-end">
        <View className="flex-row space-x-2">
          <TouchableOpacity className="border border-primary px-4 py-2 rounded-md justify-center items-center">
            <Text className="text-base text-black">Order Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#C60505] px-4 py-2 rounded-md justify-center items-center"
            onPress={() =>
              router.push(`/account/order-history/details/${123123123}`)
            }
          >
            <Text className="text-base text-white">View Details</Text>
          </TouchableOpacity>
        </View>
      </XStack>
    </YStack>
  );
};

export default OrderHistoryCard;
