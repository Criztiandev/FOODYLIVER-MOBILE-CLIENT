import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";

const ProductActions = () => {
  return (
    <XStack className="space-x-2 ">
      <TouchableOpacity className="border border-primary bg-[#EAEAEA] px-4 py-2 rounded-md flex-1">
        <YStack className="justify-center items-center">
          <Text className="text-[18px] font-bold">BUY NOW</Text>
          <Text className="text-[16px] font-bold opacity-70">PHP 184.00</Text>
        </YStack>
      </TouchableOpacity>

      <TouchableOpacity className="bg-primary  px-4 py-2 rounded-md flex-1 justify-center items-center">
        <Text className="text-[18px] font-bold text-white">ADD TO CART</Text>
      </TouchableOpacity>
    </XStack>
  );
};

export default ProductActions;
