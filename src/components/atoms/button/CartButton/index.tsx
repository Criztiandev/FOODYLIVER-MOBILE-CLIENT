import { useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const CartButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/cart/list")}>
      <ShoppingCart className="text-primary" />
    </TouchableOpacity>
  );
};

export default CartButton;
