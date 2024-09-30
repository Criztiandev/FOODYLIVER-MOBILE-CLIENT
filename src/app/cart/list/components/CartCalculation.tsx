import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import { Check, User } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const CartCalculation = () => {
  return (
    <YStack className="space-y-2">
      <Text className="font-bold text-[20px]">SubTotals</Text>
      <XStack className="space-x-4">
        <XStack>
          <User color="black" />
          <Text className="text-lg">Order Total</Text>
        </XStack>
        <Text className="text-lg">PHP 568.00</Text>
      </XStack>

      <XStack className="space-x-4">
        <XStack>
          <User color="black" />
          <Text className="text-lg">Delivery Fee</Text>
        </XStack>
        <Text className="text-lg">PHP 48.00</Text>
      </XStack>

      <XStack className="space-x-4">
        <XStack>
          <User color="black" />
          <Text className="text-lg">Total</Text>
        </XStack>
        <Text className="text-lg">0</Text>
      </XStack>
    </YStack>
  );
};

export default CartCalculation;
