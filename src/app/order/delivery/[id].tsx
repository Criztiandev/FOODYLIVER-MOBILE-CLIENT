import React, { useCallback, useState } from "react";
import { Text, View, Alert, RefreshControl } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import {
  Coins,
  Phone,
  ReceiptText,
  Truck,
  Wallet,
  CheckCircle2,
} from "lucide-react-native";
import { Image } from "expo-image";
import { ScrollView } from "react-native";

import HomeButton from "@/components/atoms/button/HomeButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import BaseLayout from "@/layout/BaseLayout";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";

import { useFetchOrderDetailsList } from "@/hooks/delivery/useFetchOrderDetailsList";
import Button from "@/components/ui/Button";

// Types
interface OrderSummaryProps {
  subtotal: number;
  shippingFee?: number;
}

interface RiderInfoProps {
  name: string;
  phone: string;
  avatar: string;
  address: string;
}

// Components
const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingFee = 50,
}) => {
  const total = subtotal + shippingFee;

  return (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <XStack className="items-center space-x-2 mb-4 border-b border-gray-200 pb-2">
        <ReceiptText color="#F4891F" size={24} />
        <Text className="text-xl font-bold text-gray-800">Order Summary</Text>
      </XStack>

      <View className="space-y-4">
        <XStack className="justify-between items-center">
          <XStack className="items-center space-x-3">
            <Truck color="#F4891F" size={20} />
            <Text className="text-base text-gray-700">Shipping Fee</Text>
          </XStack>
          <Text className="text-base font-semibold text-gray-800">
            ₱ {shippingFee}
          </Text>
        </XStack>

        <XStack className="justify-between items-center">
          <XStack className="items-center space-x-3">
            <Coins color="#F4891F" size={20} />
            <Text className="text-base text-gray-700">Sub Total</Text>
          </XStack>
          <Text className="text-base font-semibold text-gray-800">
            ₱ {subtotal}
          </Text>
        </XStack>

        <View className="border-t border-gray-200 pt-2 mt-2">
          <XStack className="justify-between items-center">
            <XStack className="items-center space-x-3">
              <Wallet color="#F4891F" size={20} />
              <Text className="text-lg font-bold text-gray-800">Total</Text>
            </XStack>
            <Text className="text-lg font-bold text-primary">₱ {total}</Text>
          </XStack>
        </View>
      </View>
    </View>
  );
};

const RiderInfo: React.FC<RiderInfoProps> = ({
  name,
  phone,
  avatar,
  address,
}) => (
  <View className="bg-primary p-4 shadow-lg border border-primary/30">
    <XStack className="items-center space-x-4">
      <Avatar size={80} source={avatar} className="border-2 border-white" />
      <YStack className="flex-1">
        <Text className="text-2xl font-bold text-white">{name}</Text>
        <XStack className="items-center space-x-2 mt-2">
          <Phone size={16} color="white" />
          <Text className="text-white/90">{phone || "09123456789"}</Text>
        </XStack>
        <Text className="text-sm text-white/70 mt-1">{address}</Text>
      </YStack>
    </XStack>
  </View>
);

const DeliveryStatus: React.FC<{ status: string }> = ({ status }) => (
  <View className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
    <XStack className="items-center justify-between">
      <XStack className="items-center space-x-3">
        <CheckCircle2 color="#22C55E" size={24} />
        <YStack>
          <Text className="text-lg font-bold text-gray-800">Order Status</Text>
          <Text className="text-primary font-semibold">{status}</Text>
        </YStack>
      </XStack>
      <Truck color="#F4891F" size={24} />
    </XStack>
  </View>
);

const RootScreen = () => {
  const { transaction_id } = useLocalSearchParams();
  const orderQry = useFetchOrderDetailsList(transaction_id as string);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await orderQry.refetch();
    setRefreshing(false);
  }, [orderQry.refetch]);

  if (orderQry.isLoading) return <LoadingScreen />;
  if (orderQry.isError) {
    console.error("Order Error:", orderQry.error);
    return <ErrorScreen />;
  }

  const selectedOrderDetails = orderQry.data.find(
    (items: any) => items.transaction_id === transaction_id
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <HomeButton />,
          title: "Delivery Details",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#f4891f" },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <BaseLayout>
        <ScrollView
          className="flex-1 bg-gray-50"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#f4891f"]}
              tintColor="#f4891f"
            />
          }
        >
          {selectedOrderDetails?.rider && (
            <RiderInfo
              name={selectedOrderDetails?.rider?.name}
              phone={selectedOrderDetails?.rider?.phone}
              address={selectedOrderDetails?.rider?.address}
              avatar={require("@/assets/images/girl-user.png")}
            />
          )}

          <View className="p-4 flex-1">
            <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-200">
              <Image
                source={require("@/assets/images/order-delivered.png")}
                style={{ height: 200, width: "100%" }}
                contentFit="cover"
              />
              <View className="p-4 bg-primary/10 border-t border-gray-200">
                <Text className="font-bold text-2xl text-center text-primary">
                  Your order has been placed!
                </Text>
              </View>
            </View>

            <DeliveryStatus status={selectedOrderDetails?.status} />
            <OrderSummary
              subtotal={Number(selectedOrderDetails?.total_amount) || 0}
            />
            <Button className="bg-primary">
              <Text className="text-white text-lg font-bold">
                Deliver Order
              </Text>
            </Button>
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
