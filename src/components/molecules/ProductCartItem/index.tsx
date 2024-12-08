import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { CartItem } from "@/interface/cart.interface";
import useCartStore from "@/state/useCartStore";
import { Box, DollarSign, Minus, Plus, Star, Tag } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProductCartItem = (props: CartItem) => {
  const { id, name, price } = props;
  const { items, incrementQuantity, addProduct, removeProduct } =
    useCartStore();
  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrementQuantity = () => {
    if (!id) return;

    if (!cartItem) {
      addProduct({ id, ...props }, 1);
    } else {
      incrementQuantity(id);
    }
  };

  const handleDecrementQuantity = () => {
    if (!id) return;
    if (quantity > 0) {
      removeProduct(id, 0);
    }
  };

  return (
    <YStack className="bg-primary/30 p-4 rounded-md justify-between items-ce mb-2 space-y-4 ">
      <XStack className="space-x-4 justify-between items-center">
        <XStack className="space-x-4">
          <Avatar
            source={{
              uri: props.thumbnail
                ? `${process.env.EXPO_PUBLIC_BASE_IMAGE_URL}/${props.thumbnail}`
                : `https://picsum.photos/seed/696/3000/2000`,
            }}
            size={64}
          />

          <YStack>
            <Text className=" text-lg font-semibold break-words max-w-[200px] capitalize">
              {name || "Products"}
            </Text>

            <XStack className="space-x-4 items-center">
              <XStack className="items-center space-x-1">
                {/* <DollarSign color="#EA9937" /> */}
                <Text className="text-stone-500">₱</Text>
                <Text className="text-sm font-semibold text-stone-500 underline">
                  {price}
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </XStack>

        <XStack className="items-center spacex-2">
          <TouchableOpacity onPress={handleIncrementQuantity}>
            <Plus color="#F4891F" />
          </TouchableOpacity>

          <Button size="icon" variant="ghost">
            <Text className="text-lg font-bold">{quantity}</Text>
          </Button>

          <TouchableOpacity onPress={handleDecrementQuantity}>
            <Minus color="#F4891F" />
          </TouchableOpacity>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default ProductCartItem;
