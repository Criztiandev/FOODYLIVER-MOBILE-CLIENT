import HomeButton from "@/components/atoms/button/HomeButton";
import DeliveryMap from "@/components/molecules/Map/DeliveryMap";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import { Stack, useRouter } from "expo-router";
import { ReceiptIcon, Truck } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const RootScreen = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <HomeButton />,
          title: "Delivery",
        }}
      />

      <BaseLayout>
        <YStack className="px-2">
          <View className="h-[300px] border border-primary rounded-md overflow-hidden ">
            <DeliveryMap
              targetRegion={{
                latitude: 37.44964795610058,
                longitude: -122.15490521863103,
              }}
            />
          </View>

          <YStack className="my-4">
            <Text className="font-bold text-2xl text-center">
              Your order has been placed!
            </Text>
          </YStack>

          <XStack className="border p-2 rounded-md border-primary/70 space-x-2 mb-4 items-center">
            <XStack className="items-center space-x-2">
              <Truck color="black" />
              <Text className="text-[18px] font-bold">Status:</Text>
            </XStack>

            <XStack className="items-center space-x-2">
              <Text className="text-[18px] font-bold">On Delivery</Text>
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
