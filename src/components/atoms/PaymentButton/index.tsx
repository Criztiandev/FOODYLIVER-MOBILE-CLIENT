import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { Href, useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const PaymentButton = () => {
  const router = useRouter();
  return (
    <Button className="my-8" onPress={() => router.push("/cart/payment")}>
      <XStack className="space-x-4 items-center">
        <ShoppingCart color="white" size={22} />
        <Text className="text-white text-base font-semibold">
          Review Payment and Address
        </Text>
      </XStack>
    </Button>
  );
};

export default PaymentButton;
