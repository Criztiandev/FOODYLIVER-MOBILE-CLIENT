import BackButton from "@/components/atoms/button/BackButton";
import CheckoutButton from "@/components/atoms/button/CheckoutButton";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import useReverseGeocode from "@/hooks/maps/useReverseGeocode";
import useGeocoding from "@/hooks/utils/useGeocoding";
import useLocation from "@/hooks/utils/useLocation";
import BaseLayout from "@/layout/BaseLayout";

import { Stack } from "expo-router";
import {
  MapIcon,
  MapPin,
  ReceiptText,
  Truck,
  Wallet,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const RootScreen = () => {
  const { address } = useReverseGeocode();

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Checkout",
        }}
      />

      <BaseLayout>
        <YStack className="p-4 space-y-8">
          <YStack className="space-y-3">
            <XStack className="items-center space-x-2">
              <MapPin color="black" />
              <Text className="text-lg font-bold">Delivery Address</Text>
            </XStack>

            <View className="rounded-md border border-primary/70 overflow-hidden h-[200px]">
              <CurrentLocationMap />
            </View>

            <Button
              variant="outline"
              className="border-primary space-x-2 flex-row"
            >
              <MapIcon color="black" />
              <Text className="text-base font-semibold">
                {address || "Current Address"}
              </Text>
            </Button>
          </YStack>

          <YStack className="space-y-4">
            <XStack className="items-center space-x-2">
              <Wallet color="black" />
              <Text className="text-lg font-bold">Payment Method</Text>
            </XStack>

            <XStack className="space-x-4">
              <Button
                variant="outline"
                className="border-primary space-x-2 flex-row"
              >
                <Truck color="black" />
                <Text className="text-base font-semibold">
                  Cash on Delivery
                </Text>
              </Button>

              <Button
                variant="outline"
                className="border-primary flex-row space-x-2"
              >
                <Avatar size={24} />
                <Text className="text-base">Gcash</Text>
              </Button>
            </XStack>
          </YStack>

          <YStack className="border p-2 rounded-md border-primary/70 space-y-2">
            <XStack className="items-center space-x-2">
              <ReceiptText color="black" />
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
                <Text className="">PHP 568.00</Text>
              </XStack>
            </YStack>
          </YStack>

          <CheckoutButton />
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
