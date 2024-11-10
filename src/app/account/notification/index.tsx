import BackButton from "@/components/atoms/button/BackButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import { Link, Stack } from "expo-router";
import { Truck } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const RootScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Notification",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
        }}
      />

      <BaseLayout>
        <YStack className="p-2 space-y-4">
          <YStack className="rounded-md border border-[#F4891F] p-2 space-y-2 my-2">
            <XStack className="space-x-2">
              <Truck color="#F4891F" />
              <Text className="text-base font-semibold text-primary">
                Your Order is on the Way
              </Text>
            </XStack>

            <Text>
              Burger with extra patty, Shanghai, Pizza Pepperoni Please prepare
              for the exact payment PHP 616.00
            </Text>
          </YStack>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
