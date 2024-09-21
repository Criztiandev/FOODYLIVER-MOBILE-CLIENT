import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { Minus, Plus } from "lucide-react-native";

const ProductQuantity = () => {
  return (
    <YStack className=" mb-4">
      <Text className="font-bold text-[24px]">Quantity</Text>
      <XStack className="space-x-4 items-center  justify-between ">
        <XStack className="space-x-4 items-center">
          <Text className="text-base opacity-70">01</Text>
          <Text className="text-[32px]">02</Text>
          <Text className="text-base opacity-70">03</Text>
        </XStack>

        <XStack className="space-x-2">
          <Button size="icon" variant="outline">
            <Plus color="black" />
          </Button>

          <Button size="icon" variant="outline">
            <Minus color="black" />
          </Button>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default ProductQuantity;
