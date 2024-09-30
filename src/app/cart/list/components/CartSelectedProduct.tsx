import ProductCartItem from "@/components/molecules/ProductCartItem";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Minus, Plus } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const CartSelectedProducts = () => {
  const router = useRouter();
  const { cart } = useCartStore();
  return (
    <YStack>
      <XStack className="justify-between items-center">
        <Text className="text-xl font-bold">CHECKOUT</Text>
      </XStack>

      <FlashList
        data={cart.items}
        estimatedItemSize={10000}
        renderItem={({ item }) => <ProductCartItem {...item} />}
      />
    </YStack>
  );
};

export default CartSelectedProducts;
