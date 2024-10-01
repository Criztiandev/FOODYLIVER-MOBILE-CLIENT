import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { CartItem } from "@/interface/cart.interface";
import useCartStore from "@/state/useCartStore";
import { Minus, Plus, View } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const ProductCartItem = ({ id, name, price, quantity }: CartItem) => {
  const [_quantity, setQuantity] = useState(quantity);
  const { updateProductQuantity, removeProduct } = useCartStore();

  const handleIncrement = () => {
    setQuantity((prev) => (prev >= 99 ? prev : (prev += 1)));
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev <= 0 ? prev : (prev -= 1)));
  };

  useEffect(() => {
    if (_quantity) {
      updateProductQuantity(id || "", _quantity);
    }

    if (_quantity <= 0) {
      removeProduct(id || "", 0);
    }
  }, [_quantity]);

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
          <TouchableOpacity
            className="border px-2 py-[5px]  border-primary/70 rounded-l-lg border-r-0"
            onPress={handleDecrement}
          >
            <Minus color="black" size={18} />
          </TouchableOpacity>

          <Text className="text-xl px-2 border text-center border-primary/70">
            {_quantity}
          </Text>

          <TouchableOpacity
            className="border px-2 py-[5px] border-primary/70 rounded-r-lg border-l-0"
            onPress={handleIncrement}
          >
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
