import React from "react";
import { Text } from "react-native";
import { PlusIcon, MinusIcon } from "lucide-react-native";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { ProductItem } from "@/interface/product.interface";

interface ProductQuantityProps extends Pick<ProductItem, "id"> {
  quantity: number;
  minQuantity?: number;
  maxQuantity?: number;
  onQuantityChange: (newQuantity: number) => void;
  selectedQuantity: number;
}

const ProductQuantity = ({
  id,
  minQuantity = 0,
  maxQuantity = 99,
  onQuantityChange,
  selectedQuantity,
}: ProductQuantityProps) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = selectedQuantity + change;
    if (newQuantity >= minQuantity && newQuantity <= maxQuantity) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <YStack className="justify-end items-start px-2">
      <Text className="text-lg font-semibold mb-2">Quantity</Text>
      <XStack className="space-x-4 items-center">
        <Button
          size="icon"
          onPress={() => handleQuantityChange(-1)}
          disabled={selectedQuantity <= minQuantity}
          aria-label="Decrease quantity"
        >
          <MinusIcon
            color={selectedQuantity <= minQuantity ? "gray" : "white"}
          />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="bg-stone-200/50 w-12"
          aria-label={`Current quantity is ${selectedQuantity}`}
        >
          <Text className="font-bold">{selectedQuantity || 0}</Text>
        </Button>

        <Button
          size="icon"
          onPress={() => handleQuantityChange(1)}
          disabled={selectedQuantity >= maxQuantity}
          aria-label="Increase quantity"
        >
          <PlusIcon
            color={selectedQuantity >= maxQuantity ? "gray" : "white"}
          />
        </Button>
      </XStack>
    </YStack>
  );
};

export default ProductQuantity;
