import HomeButton from "@/components/atoms/button/HomeButton";
import DeliveryMap from "@/components/molecules/Map/DeliveryMap";
import PaymentCheckoutDetails from "@/components/molecules/overview/PaymentCheckoutDetails";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import { Stack, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import {
  Coins,
  MapPin,
  Phone,
  ReceiptIcon,
  ReceiptText,
  Truck,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import BackButton from "@/components/atoms/button/BackButton";

const RootScreen = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <HomeButton />,
          title: "Delivery Details",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <BaseLayout>
        <YStack className="">
          <XStack className="items-center space-x-4 px-2  py-4 bg-primary ">
            <Avatar
              size={64}
              source={require("@/assets/images/girl-user.png")}
            />

            <YStack className="items-start">
              <Text className="text-xl font-bold text-white ">
                Yen Timmango
              </Text>
              <Text className="text-md font-semibold  text-white/50 ">
                Rider
              </Text>
              <Text className="text-md font-semibold  text-white/50 ">
                09492929393
              </Text>
            </YStack>
          </XStack>

          <View className="p-2">
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
                <Truck color="#F4891F" size={18} />
                <Text className="text-[18px] font-bold ">Status:</Text>
              </XStack>

              <XStack className="items-center space-x-2">
                <Text className="text-base font-semibold text-stone-600">
                  On Delivery
                </Text>
              </XStack>
            </XStack>

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
                    ₱ {0}
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
                    ₱ {0}
                  </Text>
                </XStack>

                <XStack className="justify-between items-center">
                  <XStack className="space-x-2 items-center">
                    <Wallet color="#F4891F" size={18} />
                    <Text className="text-sm font-semibold text-gray-600">
                      Total
                    </Text>
                  </XStack>
                  <Text className="text-sm font-semibold text-gray-600">
                    ₱ {0}
                  </Text>
                </XStack>
              </View>
            </YStack>
          </View>

          <View className="p-2 space-y-2">
            <Button onPress={() => router.replace(`/order/track/${123123}`)}>
              <XStack className="items-center space-x-2">
                <MapPin color="white" size={24} />
                <Text className="text-lg text-white font-semibold">
                  Track Order
                </Text>
              </XStack>
            </Button>

            {/* Crashing Phone lower */}
            <Button
              variant="outline"
              className="border-stone-400"
              onPress={() => Linking.openURL("tel:093838283838")}
            >
              <XStack className="items-center space-x-2">
                <Phone color="#F4891F" size={24} />
                <Text className="text-lg text-primary font-semibold">
                  Call Rider
                </Text>
              </XStack>
            </Button>
          </View>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
