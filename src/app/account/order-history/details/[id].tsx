import BackButton from "@/components/atoms/button/BackButton";
import OrderStatus from "@/components/organism/other/OrderStatus";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import useFetchOrderByTransactionID from "@/hooks/order/useFetchOrderByTransactionID";
import BaseLayout from "@/layout/BaseLayout";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ReceiptIcon, Truck } from "lucide-react-native";
import React, { useMemo } from "react";
import { Text, View } from "react-native";

const RootScreen = () => {
  const { customer_id, id: transaction_id, status } = useLocalSearchParams();
  const router = useRouter();

  const {
    isLoading,
    isError,
    data: result,
  } = useFetchOrderByTransactionID(customer_id as any, transaction_id as any);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <LoadingScreen />;

  const paypload = useMemo(() => {
    return result[0];
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          title: "Order History Details",
          headerTitleAlign: "center",
        }}
      />

      <BaseLayout>
        <YStack className="px-2">
          <View className="h-[300px]  rounded-md overflow-hidden ">
            <Image
              source={require("@/assets/images/order-delivered.png")}
              className="w-full h-full"
            />
          </View>

          <OrderStatus status="pending" />

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
                  <Text className="">Delivery Fee</Text>
                </XStack>
                <Text className="">PHP {paypload.delivery_fee}</Text>
              </XStack>

              <XStack className="space-x-4  justify-between items-center">
                <XStack className="space-x-2">
                  <Text className="">Total</Text>
                </XStack>

                <Text className="text-[32px] font-bold text-primary">
                  PHP {paypload.total_amount}
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
