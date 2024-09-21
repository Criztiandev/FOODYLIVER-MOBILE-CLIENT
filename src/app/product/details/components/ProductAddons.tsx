import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";

const ProductAddons = () => {
  return (
    <YStack className="space-y-2  mb-4">
      <Text className="font-bold text-[24px]">Add-ons</Text>
      <XStack className="space-x-4">
        <Button variant="outline" className="border border-[#BC0505]">
          <Text className="text-base font-bold text-primary">
            Extra Patty +26.00
          </Text>
        </Button>
        <Button variant="outline">
          <Text className="text-base font-bold text-black">
            Extra Patty +26.00
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
};

export default ProductAddons;
