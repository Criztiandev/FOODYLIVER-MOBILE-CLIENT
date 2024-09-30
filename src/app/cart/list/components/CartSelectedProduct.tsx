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
        <Text className="text-2xl font-bold">CHECKOUT</Text>

        <Button>
          <Text className="text-lg font-medium">Select All</Text>
        </Button>
      </XStack>

      <FlashList
        data={cart.items}
        estimatedItemSize={10000}
        renderItem={({ item }) => (
          <XStack className="bg-[#FCDEDE] p-4 rounded-md justify-between items-ce my-4">
            <XStack className="items-center space-x-4">
              <Avatar />
              <YStack>
                <Text className="text-[24px] font-bold">{item.name}</Text>

                {/* Addons */}

                <Text className="text-[18px] font-bold opacity-70">
                  PHP {item.price}
                </Text>
              </YStack>
            </XStack>

            <XStack className="items-center">
              <Button variant="ghost">
                <Minus color="black" />
              </Button>

              <Text className="text-2xl">{item.quantity}</Text>

              <Button variant="ghost">
                <Plus color="black" />
              </Button>
            </XStack>
          </XStack>
        )}
      />
    </YStack>
  );
};

export default CartSelectedProducts;
