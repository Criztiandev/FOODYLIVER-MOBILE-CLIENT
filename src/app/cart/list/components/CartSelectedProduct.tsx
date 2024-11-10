import BackButton from "@/components/atoms/button/BackButton";
import ProductCartItem from "@/components/molecules/ProductCartItem";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { FlashList } from "@shopify/flash-list";
import { Stack, useRouter } from "expo-router";
import { Minus, Plus } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const CartSelectedProducts = () => {
  const { items } = useCartStore();

  return (
    <YStack className="flex-1 px-2  justify-between flex-column h-full">
      <View className="min-h-[200px] ">
        <FlashList
          data={items}
          estimatedItemSize={10000}
          renderItem={({ item }) => <ProductCartItem {...item} />}
        />
      </View>
    </YStack>
  );
};

export default CartSelectedProducts;
