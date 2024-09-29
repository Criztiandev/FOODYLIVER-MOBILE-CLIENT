import { View, Text } from "react-native";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { Minus, Plus } from "lucide-react-native";
import useProductStore from "@/state/useProductStore";
import useCartStore from "@/state/useCartStore";
import { ProductItem } from "@/interface/product.interface";

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const ProductQuantity: FC<Props> = ({ quantity, setQuantity }) => {
  const handleIncrement = () =>
    setQuantity((prev) => (prev >= 99 ? prev : (prev += 1)));

  const handleDecrement = () =>
    setQuantity((prev) => (prev <= 0 ? prev : (prev -= 1)));

  return (
    <YStack className=" mb-4">
      <Text className="font-bold text-[24px]">Quantity</Text>
      <XStack className="space-x-4 items-center  justify-between ">
        <XStack className="space-x-4 items-center">
          <Text className=" opacity-70 text-xl">{quantity || 0}</Text>
        </XStack>

        <XStack className="space-x-2">
          <Button size="icon" variant="outline" onPress={handleIncrement}>
            <Plus color="black" />
          </Button>

          <Button size="icon" variant="outline" onPress={handleDecrement}>
            <Minus color="black" />
          </Button>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default ProductQuantity;
