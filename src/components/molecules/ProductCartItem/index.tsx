import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { CartItem } from "@/interface/cart.interface";
import { Minus, Plus, View } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ProductCartItem = ({ name, price, quantity }: CartItem) => {
  return (
    <YStack className="bg-[#FCDEDE] p-4 rounded-md justify-between items-ce my-4 space-y-4">
      <XStack className="justify-between items-center">
        <XStack className="items-center space-x-4">
          <Avatar />
          <YStack>
            <Text className="text-xl font-bold">{name}</Text>

            {/* Addons */}

            <Text className="font-bold text-base opacity-70">PHP {price}</Text>
          </YStack>
        </XStack>

        <XStack className="items-center ">
          <TouchableOpacity className="border px-2 py-[5px]  border-primary/70 rounded-l-lg border-r-0">
            <Minus color="black" size={18} />
          </TouchableOpacity>

          <Text className="text-xl px-2 border text-center border-primary/70">
            {quantity}
          </Text>

          <TouchableOpacity className="border px-2 py-[5px] border-primary/70 rounded-r-lg border-l-0">
            <Plus color="black" size={18} />
          </TouchableOpacity>
        </XStack>
      </XStack>

      <XStack>
        <Text className="px-2 py-1 border rounded-md border-primary">
          Addons
        </Text>
      </XStack>
    </YStack>
  );
};

export default ProductCartItem;
