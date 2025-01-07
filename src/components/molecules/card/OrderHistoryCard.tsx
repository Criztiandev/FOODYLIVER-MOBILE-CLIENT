import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useMemo } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import useFetchOrderByTransactionID from "@/hooks/order/useFetchOrderByTransactionID";
import { ReceiptText, Truck, Coins, Wallet } from "lucide-react-native";

const OrderHistoryCard = ({
  customer_id,
  transaction_id,
  latest_order_date,
  status,
  order_status,
}: any) => {
  const { isLoading, data: result } = useFetchOrderByTransactionID(
    customer_id,
    transaction_id
  );

  const assignedDate = new Date(latest_order_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const router = useRouter();

  const orderDetails = useMemo(() => {
    if (!result || !result[0]) return null;
    return {
      ...result[0],
      totalAmount: result[0]?.total_amount + result[0]?.delivery_fee,
    };
  }, [result]);

  if (isLoading) {
    return (
      <View className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 h-[200px] flex justify-center items-center">
        <ActivityIndicator color="#F4891F" size="large" />
      </View>
    );
  }

  if (!orderDetails) {
    return null;
  }

  return (
    <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-200">
      <View className="p-4 bg-primary/10 border-b border-gray-200">
        <XStack className="items-center space-x-2">
          <ReceiptText color="#F4891F" size={24} />
          <Text className="text-xl font-bold text-gray-800 break-words flex-1">
            Order #{transaction_id}
          </Text>
        </XStack>
      </View>

      <View className="p-4">
        <YStack className="space-y-4">
          <XStack className="justify-between items-center">
            <Text className="text-base text-gray-600">Ordered At</Text>
            <Text className="text-base font-semibold text-primary">
              {assignedDate}
            </Text>
          </XStack>

          {orderDetails?.delivery_fee && (
            <XStack className="justify-between items-center">
              <XStack className="items-center space-x-2">
                <Truck color="#F4891F" size={20} />
                <Text className="text-base text-gray-600">Delivery Fee</Text>
              </XStack>
              <Text className="text-base font-semibold text-gray-800">
                ₱ {orderDetails?.delivery_fee}
              </Text>
            </XStack>
          )}

          {orderDetails?.payment_method && (
            <XStack className="justify-between items-center">
              <XStack className="items-center space-x-2">
                <Wallet color="#F4891F" size={20} />
                <Text className="text-base text-gray-600">Payment Method</Text>
              </XStack>
              <Text className="text-base font-semibold text-gray-800">
                {orderDetails?.payment_method}
              </Text>
            </XStack>
          )}

          {orderDetails?.total_amount && (
            <XStack className="justify-between items-center">
              <XStack className="items-center space-x-2">
                <Coins color="#F4891F" size={20} />
                <Text className="text-base text-gray-600">Sub Total</Text>
              </XStack>
              <Text className="text-base font-semibold text-primary">
                ₱ {orderDetails?.total_amount}
              </Text>
            </XStack>
          )}

          {orderDetails?.totalAmount && (
            <XStack className="justify-between items-center">
              <XStack className="items-center space-x-2">
                <Coins color="#F4891F" size={20} />
                <Text className="text-base text-gray-600">Total Amount</Text>
              </XStack>
              <Text className="text-base font-semibold text-primary">
                ₱ {orderDetails?.totalAmount}
              </Text>
            </XStack>
          )}

          <View className="border-t border-gray-200 pt-3">
            <XStack className="justify-between items-center">
              <Text className="text-base font-semibold text-gray-700">
                Status
              </Text>
              <Text className="text-base font-bold text-primary">{status}</Text>
            </XStack>
          </View>
        </YStack>

        <View className="mt-4 flex-row justify-end">
          <Button
            size="sm"
            onPress={() =>
              router.push(
                `/account/order-history/details/${transaction_id}?customer_id=${customer_id}&status=${order_status}` as any
              )
            }
            className="bg-primary px-6"
          >
            <Text className="text-white font-semibold">View Details</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default OrderHistoryCard;
