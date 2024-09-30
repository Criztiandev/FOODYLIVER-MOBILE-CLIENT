import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const CheckoutButton = () => {
  return (
    <Button className="my-8">
      <XStack className="space-x-4">
        <ShoppingCart color="white" />
        <Text className="text-white text-lg">Checkout Order</Text>
      </XStack>
    </Button>
  );
};

export default CheckoutButton;
