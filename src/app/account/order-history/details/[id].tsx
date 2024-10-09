import BackButton from "@/components/atoms/button/BackButton";
import HomeButton from "@/components/atoms/button/HomeButton";
import DeliveryMap from "@/components/molecules/Map/DeliveryMap";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import useCartStore from "@/state/useCartStore";
import { Stack, useRouter } from "expo-router";
import { ReceiptIcon, Truck } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const RootScreen = () => {
  const router = useRouter();
  const { cart } = useCartStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Order Delivered",
        }}
      />

      <BaseLayout>
        <YStack className="px-2">
          <View className="h-[300px] border border-primary rounded-md overflow-hidden "></View>

          <YStack className="my-4">
            <Text className="font-bold text-2xl text-center">
              Your order has been Delivered!
            </Text>
          </YStack>

          <XStack className="border p-2 rounded-md border-primary/70 space-x-2 mb-4 items-center">
            <XStack className="items-center space-x-2">
              <Truck color="black" />
              <Text className="text-[18px] font-bold">Status:</Text>
            </XStack>

            <XStack className="items-center space-x-2">
              <Text className="text-[18px] font-bold">Delivered</Text>
            </XStack>
          </XStack>

          <YStack className="border p-2 rounded-md border-primary/70 space-y-2 mb-4">
            <XStack className="items-center space-x-2">
              <ReceiptIcon color="black" />
              <Text className="text-[18px] font-bold">Rider's Details</Text>
            </XStack>

            <YStack className="space-y-2">
              <XStack className="space-x-4  justify-between items-center">
                <XStack className="space-x-2">
                  <Text className="">Name</Text>
                </XStack>
                <Text className="">Yen Timmango</Text>
              </XStack>

              <XStack className="space-x-4  justify-between items-center">
                <XStack className="space-x-2">
                  <Text className="">Phone number</Text>
                </XStack>
                <Text className="">09482004868</Text>
              </XStack>
            </YStack>
          </YStack>

          <YStack className="border p-2 rounded-md border-primary/70 space-y-2 mb-4">
            <XStack className="items-center space-x-2">
              <ReceiptIcon color="black" />
              <Text className="text-[18px] font-bold">Order Summary</Text>
            </XStack>

            <YStack className="space-y-2">
              <XStack className="space-x-4  justify-between items-center">
                <XStack className="space-x-2">
                  <Text className="">Subtotal</Text>
                </XStack>
                <Text className="">PHP 568.00</Text>
              </XStack>

              <XStack className="space-x-4  justify-between items-center">
                <XStack className="space-x-2">
                  <Text className="">Delivery Fee</Text>
                </XStack>
                <Text className="">PHP 48.00</Text>
              </XStack>

              <XStack className="space-x-4  justify-between items-center">
                <XStack className="space-x-2">
                  <Text className="">Total</Text>
                </XStack>

                <Text className="text-[32px] font-bold text-primary">
                  PHP 568.00
                </Text>
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
