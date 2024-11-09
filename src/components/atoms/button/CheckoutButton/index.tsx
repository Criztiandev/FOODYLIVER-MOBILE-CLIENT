import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const CheckoutButton = () => {
  const router = useRouter();
  return (
    <Button className="my-8" onPress={() => router.replace("/order/delivery")}>
      <XStack className="space-x-4">
        <ShoppingCart className="text-primary" />
        <Text className="text-white text-lg">Checkout Order</Text>
      </XStack>
    </Button>
  );
};

export default CheckoutButton;
