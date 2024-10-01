import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import useCartStore from "@/state/useCartStore";
import { ProductItem } from "@/interface/product.interface";
import Toast from "react-native-toast-message";

interface Props {
  product: ProductItem;
  quantity: number;
}

const ProductActions: FC<Props> = ({ product, quantity }) => {
  const { addProduct } = useCartStore();

  const handleAddProduct = () => {
    Toast.show({
      type: "success",
      text1: "Product Added to the cart",
    });

    addProduct(product, quantity);
  };

  return (
    <XStack className="space-x-2 ">
      <TouchableOpacity className="border border-primary bg-[#EAEAEA] px-4 py-2 rounded-md flex-1">
        <YStack className="justify-center items-center">
          <Text className=" font-bold">BUY NOW</Text>
          <Text className="font-bold opacity-70">PHP 184.00</Text>
        </YStack>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-primary  px-4 py-2 rounded-md flex-1 justify-center items-center"
        onPress={handleAddProduct}
      >
        <Text className=" font-bold text-white">ADD TO CART</Text>
      </TouchableOpacity>
    </XStack>
  );
};

export default ProductActions;
