import React from "react";
import { Text, View, Alert } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import {
  Coins,
  MapPin,
  Phone,
  ReceiptText,
  Truck,
  Wallet,
} from "lucide-react-native";

import HomeButton from "@/components/atoms/button/HomeButton";
import DeliveryMap from "@/components/molecules/Map/DeliveryMap";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";

import useAccountStore from "@/state/useAccountStore";
import useCartStore from "@/state/useCartStore";
import { useFetchOrderDetailsList } from "@/hooks/delivery/useFetchOrderDetailsList";
import { useFetchRiderById } from "@/hooks/rider/useFetchRiderById";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";
import { Image } from "expo-image";

// Types remain the same
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

// Components remain the same
const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingFee = 50,
}) => {
  const total = subtotal + shippingFee;

  return (
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
            ₱ {shippingFee}
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
            ₱ {subtotal}
          </Text>
        </XStack>

        <XStack className="justify-between items-center">
          <XStack className="space-x-2 items-center">
            <Wallet color="#F4891F" size={18} />
            <Text className="text-sm font-semibold text-gray-600">Total</Text>
          </XStack>
          <Text className="text-sm font-semibold text-gray-600">₱ {total}</Text>
        </XStack>
      </View>
    </YStack>
  );
};

const RiderInfo: React.FC<RiderInfoProps> = ({
  name,
  phone,
  avatar,
  address,
}) => (
  <XStack className="items-center space-x-4 px-2 py-4 bg-primary">
    <Avatar size={64} source={avatar} />
    <YStack className="items-start">
      <Text className="text-xl font-bold text-white">{name}</Text>
      <Text className="text-md font-semibold text-white/50">Rider</Text>
      <Text className="text-md font-semibold text-white/50">{phone}</Text>
      <Text className="text-md font-semibold text-white/50">{address}</Text>
    </YStack>
  </XStack>
);

const DeliveryStatus: React.FC<{ status: string }> = ({ status }) => (
  <XStack className="border p-2 rounded-md border-primary/70 space-x-2 mb-4 items-center">
    <XStack className="items-center space-x-2">
      <Truck color="#F4891F" size={18} />
      <Text className="text-[18px] font-bold">Status:</Text>
    </XStack>
    <XStack className="items-center space-x-2">
      <Text className="text-base font-semibold text-stone-600">{status}</Text>
    </XStack>
  </XStack>
);

const RootScreen = () => {
  const { transaction_id } = useLocalSearchParams();
  const router = useRouter();
  const { subtotal } = useCartStore();

  // First, fetch order details
  const orderQry = useFetchOrderDetailsList(transaction_id as string);
  if (orderQry.isLoading) return <LoadingScreen />;

  // Error states
  if (orderQry.isError) {
    console.error("Order Error:", orderQry.error);
    return <ErrorScreen />;
  }

  const selectedOrderDetails = orderQry.data.find(
    (items: any) => items.transaction_id === transaction_id
  );

  const handleCallRider = async () => {
    if (selectedOrderDetails?.rider?.phone_number) {
      Alert.alert("Error", "Rider phone number not available");
      return;
    }

    try {
      await Linking.openURL(`tel:${selectedOrderDetails?.rider?.phone_number}`);
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to make phone call. Please try again later."
      );
    }
  };

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
        <YStack className="flex-1">
          {selectedOrderDetails?.rider && (
            <RiderInfo
              name={selectedOrderDetails?.rider?.name}
              phone={selectedOrderDetails?.rider?.phone}
              address={selectedOrderDetails?.rider?.address}
              avatar={require("@/assets/images/girl-user.png")}
            />
          )}

          <View className="p-2 flex-1">
            <View className="h-[200px] rounded-md overflow-hidden">
              <Image
                source={require("@/assets/images/order-delivered.png")}
                style={{ height: "100%", width: "100%" }}
              />
            </View>

            <YStack className="my-4">
              <Text className="font-bold text-2xl text-center">
                Your order has been placed!
              </Text>
            </YStack>

            <DeliveryStatus status={selectedOrderDetails?.status} />
            <OrderSummary
              subtotal={Number(selectedOrderDetails?.total_amount) || 0}
            />
          </View>

          <View className="p-2 space-y-2">
            {selectedOrderDetails?.rider &&
              selectedOrderDetails?.status !== "PENDING" && (
                <Button
                  onPress={() =>
                    router.replace(`/order/track/${transaction_id}`)
                  }
                  accessibilityLabel="Track Order"
                >
                  <XStack className="items-center space-x-2">
                    <MapPin color="white" size={24} />
                    <Text className="text-lg text-white font-semibold">
                      Track Order
                    </Text>
                  </XStack>
                </Button>
              )}
            {selectedOrderDetails?.rider && (
              <Button
                variant="outline"
                className="border-stone-400"
                onPress={handleCallRider}
                accessibilityLabel="Call Rider"
              >
                <XStack className="items-center space-x-2">
                  <Phone color="#F4891F" size={24} />
                  <Text className="text-lg text-primary font-semibold">
                    Call Rider
                  </Text>
                </XStack>
              </Button>
            )}
          </View>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
