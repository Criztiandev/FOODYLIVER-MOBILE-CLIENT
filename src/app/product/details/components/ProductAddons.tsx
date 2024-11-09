import { View, Text } from "react-native";
import React, { useState } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { ProductItem } from "@/interface/product.interface";
import useProductStore from "@/state/useProductStore";

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

const ProductAddons = ({ onSelect, addons, selected }: Props) => {
  const rawData: RawData = JSON.parse(addons);

  // Convert the object to an array
  const convertedArray = Object.entries(rawData.items).map(
    ([id, item]): Item & { id: string } => ({
      id,
      ...item,
    })
  );

  return (
    <YStack className="space-y-2  mb-4">
      <Text className="font-bold text-[24px]">Add-ons</Text>
      <XStack className="flex flex-wrap gap-2">
        {convertedArray?.map((item) => {
          const isSelected = selected.includes(item.name);
          const borderStyle = isSelected ? "border-[#BC0505]" : "border-black";
          const textColor = isSelected ? "text-primary" : "text-black";
          const opacity = isSelected ? "opacity-100" : "opacity-50";

          return (
            <Button
              key={item.id}
              variant="outline"
              className={`border ${borderStyle} ${opacity} mb-2`}
              onPress={() => onSelect(item.name)}
            >
              <Text className={`text-base font-bold ${textColor} capitalize`}>
                {item.name} +P{item.value}
              </Text>
            </Button>
          );
        })}
      </XStack>
    </YStack>
  );
};

export default ProductAddons;
