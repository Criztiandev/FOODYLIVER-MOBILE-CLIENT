import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { Check, User } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const CartCalculation = () => {
  return (
    <YStack className="space-y-2">
      <Text className="font-bold text-lg">Subtotal</Text>
      <XStack className="space-x-4  justify-between items-center">
        <XStack className="space-x-2">
          <User color="black" size={22} />
          <Text className="">Order Total</Text>
        </XStack>
      </XStack>

      <XStack className="space-x-4  justify-between items-center">
        <XStack className="space-x-2">
          <User color="black" size={22} />
          <Text className="">Delivery Fee</Text>
        </XStack>
        <Text className="">PHP 48.00</Text>
      </XStack>

      <XStack className="space-x-4  justify-between items-center">
        <XStack className="space-x-2 items-center">
          <Text className="font-bold  text-xl">Total</Text>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default CartCalculation;
