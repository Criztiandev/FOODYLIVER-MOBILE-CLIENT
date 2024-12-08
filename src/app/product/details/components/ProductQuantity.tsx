import React from "react";
import { Text } from "react-native";
import { PlusIcon, MinusIcon } from "lucide-react-native";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { ProductItem } from "@/interface/product.interface";

interface ProductQuantityProps extends ProductItem {
  maxQuantity?: number;
}

const ProductQuantity = ({
  id,
  maxQuantity = 99,
  ...props
}: ProductQuantityProps) => {
  const { items, incrementQuantity, decrementQuantity, addProduct } =
    useCartStore();

  const currentItem = items.find((item) => item.id === id);
  const currentQuantity = currentItem?.quantity || 0;

  const handleIncrement = () => {
    if (!currentItem) {
      addProduct({ id, ...props }, 1);
      return;
    }

    if (currentQuantity < maxQuantity) {
      incrementQuantity(id as string);
    }
  };

  const handleDecrement = () => {
    if (currentQuantity > 0) {
      decrementQuantity(id as string);
    }
  };

  return (
    <YStack className="justify-end items-start px-2">
      <Text className="text-lg font-semibold mb-2">Quantity</Text>
      <XStack className="space-x-4 items-center">
        <Button
          size="icon"
          onPress={handleDecrement}
          disabled={currentQuantity <= 0}
          aria-label="Decrease quantity"
        >
          <MinusIcon color={currentQuantity <= 0 ? "gray" : "white"} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="bg-stone-200/50 w-12"
          aria-label={`Current quantity is ${currentQuantity}`}
        >
          <Text className="font-bold">{currentQuantity}</Text>
        </Button>

        <Button
          size="icon"
          onPress={handleIncrement}
          disabled={currentQuantity >= maxQuantity}
          aria-label="Increase quantity"
        >
          <PlusIcon color={currentQuantity >= maxQuantity ? "gray" : "white"} />
        </Button>
      </XStack>
    </YStack>
  );
};

export default ProductQuantity;
