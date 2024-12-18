import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Avatar from "@/components/ui/Avatar";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";

const OrderHistoryCard = ({ name, transaction_id, latest_order_date }: any) => {
  const assignedDate = new Date(latest_order_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const router = useRouter();

  return (
    <YStack className="border border-stone-300 rounded-md p-2 mb-4">
      <YStack className="mb-4">
        <XStack className="space-x-2">
          <Avatar size={64} />
          <YStack className=" flex-shrink space-y-2">
            <Text className="text-base font-semibold text-primary flex-shrink">
              Burger with extra patty, Shanghai, Pizza Pe...
            </Text>

            <YStack className="">
              <XStack className="justify-end items-center space-x-2">
                <Text className="text-end font-bold">Ordered At</Text>
                <Text className=" font-bold">{assignedDate}</Text>
              </XStack>
              <XStack className="justify-end items-center space-x-2">
                <Text className="text-end font-bold">Order Total:</Text>
                <Text className="text-[#FF7C02] font-bold">PHP 616.00</Text>
              </XStack>
            </YStack>
          </YStack>
        </XStack>
      </YStack>

      <XStack className="justify-end">
        <View className="flex-row space-x-2">
          <Button
            size="sm"
            onPress={() =>
              router.push(`/account/order-history/details/${transaction_id}`)
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
