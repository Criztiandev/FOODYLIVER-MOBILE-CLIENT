import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Avatar from "@/components/ui/Avatar";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import useFetchOrderByTransactionID from "@/hooks/order/useFetchOrderByTransactionID";
import { Activity } from "lucide-react-native";

const OrderHistoryCard = ({
  customer_id,
  transaction_id,
  latest_order_date,
  status,
  order_status,
}: any) => {
  const {
    isLoading,
    isError,
    data: result,
  } = useFetchOrderByTransactionID(customer_id, transaction_id);

  const assignedDate = new Date(latest_order_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const router = useRouter();

  if (isLoading) {
    return (
      <YStack className="border border-stone-300 rounded-md p-2 mb-4 h-[200px] flex justify-center items-center">
        <YStack className="mb-4">
          <ActivityIndicator />
        </YStack>
      </YStack>
    );
  }
  return (
    <YStack className="border border-stone-300 rounded-md p-2 mb-4">
      <YStack className="mb-4">
        <Text className="text-2xl font-bold">Order Details</Text>
        <View className="w-full border-[0.5px] border-stone-200 my-4"></View>
        <YStack className="">
          <XStack className="justify-between items-center space-x-2">
            <Text className="text-end font-bold">Ordered At</Text>
            <Text className="text-[#FF7C02] font-bold">{assignedDate}</Text>
          </XStack>

          {result[0]?.delivery_time && (
            <XStack className="justify-between items-center space-x-2">
              <Text className="text-end font-bold">Payment Method:</Text>
              <Text className="text-[#FF7C02] font-bold">
                {result[0]?.delivery_time}
              </Text>
            </XStack>
          )}

          {result[0]?.delivery_fee && (
            <XStack className="justify-between items-center space-x-2">
              <Text className="text-end font-bold">Delivery Fee:</Text>
              <Text className="text-[#FF7C02] font-bold">
                ₱ {result[0]?.delivery_fee}
              </Text>
            </XStack>
          )}

          {result[0]?.payment_method && (
            <XStack className="justify-between items-center space-x-2">
              <Text className="text-end font-bold">Payment Method:</Text>
              <Text className="text-[#FF7C02] font-bold">
                {result[0]?.payment_method}
              </Text>
            </XStack>
          )}

          {result[0]?.total_amount && (
            <XStack className="justify-between items-center space-x-2">
              <Text className="text-end font-bold">Payment Method:</Text>
              <Text className="text-[#FF7C02] font-bold">
                ₱ {result[0]?.total_amount}
              </Text>
            </XStack>
          )}
          <XStack className="justify-between items-center space-x-2">
            <Text className="text-end font-bold">Order Status:</Text>
            <Text className="text-[#FF7C02] font-bold">{status}</Text>
          </XStack>
        </YStack>
      </YStack>

      <XStack className="justify-end">
        <View className="flex-row space-x-2">
          <Button
            size="sm"
            onPress={() =>
              router.push(
                `/account/order-history/details/${transaction_id}?customer_id=${customer_id}&status=${order_status}` as any
              )
            }
          >
            <Text className="text-white font-semibold">View Details</Text>
          </Button>
        </View>
      </XStack>
    </YStack>
  );
};

export default OrderHistoryCard;
