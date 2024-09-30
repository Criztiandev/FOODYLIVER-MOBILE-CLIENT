import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const CartAddons = () => {
  return (
    <XStack className="space-x-4">
      <Button
        variant="outline"
        className="border-2 border-[#BC0505] flex-row space-x-2"
      >
        <Check color="#BC0505" />
        <Text className="font-bold text-md text-primary">Cash on Delivery</Text>
      </Button>

      <Button variant="outline">
        <Text className="font-bold text-md">Gcash</Text>
      </Button>
    </XStack>
  );
};

export default CartAddons;
