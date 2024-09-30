import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import React from "react";
import { Text } from "react-native";

const CartEmpty = () => {
  return (
    <YStack className="flex-1 justify-center items-center space-y-4     ">
      <Avatar size={120} />
      <YStack className="space-y-4 justify-center items-center">
        <Text className="text-2xl font-bold">Hungry ?</Text>
        <Text className="text-base">
          You have not added anything to your cart
        </Text>
        <Button className="px-8">
          <Text className="text-white font-semibold">Browse</Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default CartEmpty;
