import { View, Text } from "react-native";
import React, { useState } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { ProductItem } from "@/interface/product.interface";
import useProductStore from "@/state/useProductStore";
import { Plus } from "lucide-react-native";

interface Props extends Pick<ProductItem, "addons"> {
  selected: string[];
  onSelect: (name: string) => void;
}

// Define the structure of each item
interface Item {
  name: string;
  value: number;
}

// Define the structure of the items object
interface ItemsObject {
  [key: string]: Item;
}

// Define the structure of the raw data
interface RawData {
  items: ItemsObject;
}

const ProductAddons = () => {
  return (
    <YStack className="justify-end items-start mb-4">
      <Text className="text-lg font-semibold mb-2">Addons</Text>
      <XStack className="space-x-4 items-cemter">
        <Button
          variant="outline"
          className="py-2 px-4 border border-[#F4891F] "
        >
          <XStack className="space-x-2 items-center">
            <Plus color="#F4891F" />
            <Text className="text-primary font-semibold">Extra Patty</Text>
          </XStack>
        </Button>

        <Button
          variant="outline"
          className="py-2 px-4 border border-stone-400 "
        >
          <XStack className="space-x-2 items-center">
            <Text className="font-semibold">Extra Patty</Text>
          </XStack>
        </Button>
      </XStack>
    </YStack>
  );
};

export default ProductAddons;
