import BackButton from "@/components/atoms/button/BackButton";
import OrderHistoryCard from "@/components/molecules/card/OrderHistoryCard";
import YStack from "@/components/stacks/YStack";
import { OrderDataSet } from "@/data/order.data";
import BaseLayout from "@/layout/BaseLayout";
import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const RootScreen = () => {
  const { status } = useLocalSearchParams();

  const preparedTitle =
    (status as string) === "history"
      ? "Order History"
      : `To ${(status[0].toUpperCase() + status.slice(1)) as string}`;

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: preparedTitle,
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
        }}
      />

      <BaseLayout>
        <YStack className="p-2 space-y-4">
          <YStack>
            <OrderHistoryCard />
          </YStack>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
