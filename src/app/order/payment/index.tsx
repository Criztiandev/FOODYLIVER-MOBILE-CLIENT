import BackButton from "@/components/atoms/button/BackButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";

import { router, Stack } from "expo-router";
import { ShoppingBag, Truck, Wallet } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import PaymentMap from "../../../components/molecules/Map/PaymentMap";
import PaymentCheckoutDetails from "../../../components/molecules/overview/PaymentCheckoutDetails";

const SHIPPING_FEE = 50;

const paymentMethod = [
  {
    id: 0,
    title: "Cash on delivery",
    keyword: "COD",
  },
  {
    id: 1,
    title: "G Cash",
    keyword: "gcash",
  },
];

const RootScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");

  const handleSelectPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    // check the method first before navigating for placing
    if (selectedPaymentMethod === "gcash") {
      router.push("/order/payment/gcash");
      return;
    }

    router.push("/order/delivery");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Payment",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <BaseLayout>
        <YStack className="p-4 space-y-4">
          <PaymentMap />

          <YStack className="space-y-4">
            <XStack className="items-center space-x-2">
              <Wallet color="#F4891F" />
              <Text className="text-lg font-bold">Payment Method</Text>
            </XStack>

            <XStack className="space-x-4">
              {paymentMethod.map(({ keyword, title }) => {
                const isSelectedMethod = selectedPaymentMethod === keyword;
                return (
                  <Button
                    key={keyword}
                    variant={isSelectedMethod ? "default" : "outline"}
                    className=" space-x-2 flex-row border-stone-400 "
                    onPress={() => handleSelectPaymentMethod(keyword)}
                  >
                    <Truck color={isSelectedMethod ? "white" : "#F4891F"} />
                    <Text
                      className={`text-base font-semibold ${
                        isSelectedMethod ? "text-white" : "text-primary"
                      }`}
                    >
                      {title}
                    </Text>
                  </Button>
                );
              })}
            </XStack>
          </YStack>
        </YStack>
      </BaseLayout>

      <View className="p-4 absolute bottom-0 w-full space-y-4">
        <PaymentCheckoutDetails />
        <Button onPress={handlePlaceOrder}>
          <XStack className="space-x-2 items-center">
            <ShoppingBag color="white" size={18} />
            <Text className="text-lg font-semibold text-white">
              Place order
            </Text>
          </XStack>
        </Button>
      </View>
    </>
  );
};

export default RootScreen;
