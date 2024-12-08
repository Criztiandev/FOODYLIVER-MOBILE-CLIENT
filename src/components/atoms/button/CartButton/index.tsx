import useCartStore from "@/state/useCartStore";
import { useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const { items } = useCartStore();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/cart/list")}
      className="relative"
    >
      {items.length > 0 && (
        <View className="absolute -right-2 -top-2 z-50 w-[18px] h-[18px] rounded-full bg-red-500 flex justify-center items-center">
          <Text className="text-white text-[12px]">{items.length}</Text>
        </View>
      )}
      <ShoppingCart className="text-white" />
    </TouchableOpacity>
  );
};

export default CartButton;
