import BackButton from "@/components/atoms/button/BackButton";
import useCartStore from "@/state/useCartStore";
import { router, Stack } from "expo-router";
import React, { useMemo } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CartEmpty from "./components/CartEmpty";
import YStack from "@/components/stacks/YStack";
import CartSelectedProducts from "./components/CartSelectedProduct";
import Button from "@/components/ui/Button";
import { Coins, Ship, ShoppingBag, Truck, Wallet } from "lucide-react-native";
import XStack from "@/components/stacks/XStack";
import Avatar from "@/components/ui/Avatar";

const SHIPPING_FEE = 50;

const RootScreen = () => {
  const { items, calculateSubtotal } = useCartStore();
  const calculatedTotal = useMemo(() => {
    return calculateSubtotal() + SHIPPING_FEE;
  }, [calculateSubtotal]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "My Cart",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
        }}
      />

      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1">
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
                Block 56, Lot 14, Villa Luisa North
              </Text>
            </YStack>
          </XStack>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 80 }} // Add padding for checkout button
          >
            {items && items.length > 0 ? (
              <YStack className="px-2">
                <CartSelectedProducts />
                <View className="h-4" />
              </YStack>
            ) : (
              <CartEmpty />
            )}
          </ScrollView>

          <View className="p-4 border-t border-gray-200 bg-white absolute bottom-0 left-0 w-full">
            <View className="mb-2 space-y-2">
              <XStack className="justify-between items-center">
                <XStack className="items-center space-x-2">
                  <Truck color="black" size={18} />
                  <Text className="text-sm font-semibold text-gray-600">
                    Shipping Fee
                  </Text>
                </XStack>
                <Text className="text-sm font-semibold text-gray-600">
                  {SHIPPING_FEE}
                </Text>
              </XStack>

              <XStack className="justify-between items-center">
                <XStack className="space-x-2 items-center">
                  <Coins color="black" size={18} />
                  <Text className="text-sm font-semibold text-gray-600">
                    Sub Total
                  </Text>
                </XStack>
                <Text className="text-sm font-semibold text-gray-600">
                  {calculateSubtotal()}
                </Text>
              </XStack>

              <XStack className="justify-between items-center">
                <XStack className="space-x-2 items-center">
                  <Wallet color="black" size={18} />
                  <Text className="text-sm font-semibold text-gray-600">
                    Total
                  </Text>
                </XStack>
                <Text className="text-sm font-semibold text-gray-600">
                  {calculatedTotal}
                </Text>
              </XStack>
            </View>

            <Button
              className="flex-row items-center justify-center"
              onPress={() => router.push("/order/payment")}
            >
              <ShoppingBag color="white" size={18} />
              <Text className="ml-2 text-lg font-semibold text-white">
                Checkout
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RootScreen;
