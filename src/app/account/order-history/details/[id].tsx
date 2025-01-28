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
import {
  ReceiptText,
  Truck,
  Phone,
  MapPin,
  Coins,
  Wallet,
} from "lucide-react-native";
import React, { useMemo, useState, useCallback } from "react";
import {
  Text,
  View,
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
} from "react-native";
import Avatar from "@/components/ui/Avatar";

const RootScreen = () => {
  const { customer_id, id: transaction_id, status } = useLocalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading,
    isError,
    data: result,
    refetch,
  } = useFetchOrderByTransactionID(customer_id as any, transaction_id as any);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <LoadingScreen />;

  const orderDetails = useMemo(() => {
    return result[0];
  }, [result]);

  const handleCallRider = async () => {
    if (!orderDetails?.rider?.phone_number) {
      Alert.alert("Error", "Rider phone number not available");
      return;
    }

    try {
      await Linking.openURL(`tel:${orderDetails?.rider?.phone_number}`);
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to make phone call. Please try again later."
      );
    }
  };

  console.log(orderDetails);

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
        <ScrollView
          className="flex-1 bg-gray-50"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orderDetails?.rider && (
            <View className="bg-primary p-4 shadow-lg border border-primary/30">
              <XStack className="items-center space-x-4">
                <Avatar
                  size={80}
                  source={require("@/assets/images/girl-user.png")}
                  className="border-2 border-white"
                />
                <YStack className="flex-1">
                  <Text className="text-2xl font-bold text-white">
                    {orderDetails.rider.name}
                  </Text>
                  <Text className="text-base text-white/80 mt-1">Rider</Text>
                  <XStack className="items-center space-x-2 mt-2">
                    <Phone size={16} color="white" />
                    <Text className="text-white/90">
                      {orderDetails.rider.phone_number || "N/A"}
                    </Text>
                  </XStack>
                  <Text className="text-sm text-white/70 mt-1">
                    {orderDetails.rider.address}
                  </Text>
                </YStack>
              </XStack>
            </View>
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
                  Order Details
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
              <XStack className="items-center space-x-2 mb-4 border-b border-gray-200 pb-2">
                <ReceiptText color="#F4891F" size={24} />
                <Text className="text-xl font-bold text-gray-800">
                  Order Summary
                </Text>
              </XStack>

              <View className="space-y-4">
                <XStack className="justify-between items-center">
                  <XStack className="items-center space-x-3">
                    <Truck color="#F4891F" size={20} />
                    <Text className="text-base text-gray-700">
                      Shipping Fee
                    </Text>
                  </XStack>
                  <Text className="text-base font-semibold text-gray-800">
                    ₱ {orderDetails.delivery_fee}
                  </Text>
                </XStack>

                <XStack className="justify-between items-center">
                  <XStack className="items-center space-x-3">
                    <Coins color="#F4891F" size={20} />
                    <Text className="text-base text-gray-700">Sub Total</Text>
                  </XStack>
                  <Text className="text-base font-semibold text-gray-800">
                    ₱ {orderDetails.total_amount}
                  </Text>
                </XStack>

                <View className="border-t border-gray-200 pt-2 mt-2">
                  <XStack className="justify-between items-center">
                    <XStack className="items-center space-x-3">
                      <Wallet color="#F4891F" size={20} />
                      <Text className="text-lg font-bold text-gray-800">
                        Total
                      </Text>
                    </XStack>
                    <Text className="text-lg font-bold text-primary">
                      ₱ {orderDetails.total_amount}
                    </Text>
                  </XStack>
                </View>
              </View>
            </View>

            <View className="space-y-3 mt-auto">
              {orderDetails?.rider && orderDetails?.status === "ONGOING" && (
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 py-4"
                  onPress={handleCallRider}
                  accessibilityLabel="Call Rider"
                >
                  <XStack className="items-center justify-center space-x-3">
                    <Phone color="#F4891F" size={24} />
                    <Text className="text-lg text-primary font-bold">
                      Call Rider
                    </Text>
                  </XStack>
                </Button>
              )}
            </View>
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
