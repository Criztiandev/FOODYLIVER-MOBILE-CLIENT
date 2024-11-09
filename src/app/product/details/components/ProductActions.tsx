import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, useCallback, useEffect, useState } from "react";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import useCartStore from "@/state/useCartStore";
import { ProductItem } from "@/interface/product.interface";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

interface Props {
  product: ProductItem;
  quantity: number;
}

const ProductActions: FC<Props> = ({ product, quantity }) => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const { addProduct, getProductDetails } = useCartStore();

  const handleAddProduct = () => {
    Toast.show({
      type: "success",
      text1: "Product Added to the cart",
    });

    addProduct(product, quantity);
  };

  const handleBuyProduct = () => {
    addProduct(product, quantity);

    router.push("/cart/list");
  };

  useEffect(() => {
    if (quantity > 0) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity]);

  return (
    <XStack className="space-x-2 px-2 py-4 ">
      <TouchableOpacity
        className="border border-primary bg-[#EAEAEA] px-4 py-2 rounded-md flex-1"
        onPress={handleBuyProduct}
      >
        <YStack className="justify-center items-center">
          <Text className=" font-bold">BUY NOW</Text>
          <Text className="font-bold opacity-70">PHP {totalPrice}</Text>
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
