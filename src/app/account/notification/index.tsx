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
        }}
      />

      <BaseLayout>
        <YStack className="p-2 space-y-4">
          <XStack>
            <Text className="text-lg">Order Updates</Text>
          </XStack>
          <YStack className="rounded-md border border-[#bc0505] p-2 space-y-2 ">
            <XStack className="space-x-2">
              <Truck color="#bc0505" />
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
