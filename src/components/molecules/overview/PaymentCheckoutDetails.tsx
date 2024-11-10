import { View, Text } from "react-native";
import React, { useMemo } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { ReceiptText, Truck, Coins, Wallet } from "lucide-react-native";
import useCartStore from "@/state/useCartStore";

const SHIPPING_FEE = 50;

const PaymentCheckoutDetails = () => {
  const { calculateSubtotal } = useCartStore();

  const calculatedTotal = useMemo(() => {
    return calculateSubtotal() + SHIPPING_FEE;
  }, []);

  return (
    <YStack className="border p-2 rounded-md border-primary/70 space-y-2">
      <XStack className="items-center space-x-2 mb-2">
        <ReceiptText color="#F4891F" />
        <Text className="text-[18px] font-bold">Order Summary</Text>
      </XStack>

      <View className="mb-2 space-y-2">
        <XStack className="justify-between items-center">
          <XStack className="items-center space-x-2">
            <Truck color="#F4891F" size={18} />
            <Text className="text-sm font-semibold text-gray-600">
              Shipping Fee
            </Text>
          </XStack>
          <Text className="text-sm font-semibold text-gray-600">
            ₱ {SHIPPING_FEE}
          </Text>
        </XStack>

        <XStack className="justify-between items-center">
          <XStack className="space-x-2 items-center">
            <Coins color="#F4891F" size={18} />
            <Text className="text-sm font-semibold text-gray-600">
              Sub Total
            </Text>
          </XStack>
          <Text className="text-sm font-semibold text-gray-600">
            ₱ {calculateSubtotal()}
          </Text>
        </XStack>

        <XStack className="justify-between items-center">
          <XStack className="space-x-2 items-center">
            <Wallet color="#F4891F" size={18} />
            <Text className="text-sm font-semibold text-gray-600">Total</Text>
          </XStack>
          <Text className="text-sm font-semibold text-gray-600">
            ₱ {calculatedTotal}
          </Text>
        </XStack>
      </View>
    </YStack>
  );
};

export default PaymentCheckoutDetails;
