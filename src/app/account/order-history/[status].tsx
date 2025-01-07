import BackButton from "@/components/atoms/button/BackButton";
import OrderHistoryCard from "@/components/molecules/card/OrderHistoryCard";
import EmptyReview from "@/components/molecules/review/EmptyReview";
import useFetchProfile from "@/hooks/account/useFetchProfile";
import useFetchOrdersById from "@/hooks/order/useFetchOrdersById";
import { useFetchProductList } from "@/hooks/product/query";
import BaseLayout from "@/layout/BaseLayout";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import { FlashList } from "@shopify/flash-list";
import { AxiosError } from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const FLAG = {
  pending: "Pay",
  ongoing: "Deliver", // Fixed typo in "Deliver"
  delviered: "Complete",
  history: "Order History", // Added history case
} as const;
type OrderStatus = keyof typeof FLAG;

const RootScreen = () => {
  const { status } = useLocalSearchParams();
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error,
    isSuccess,
  } = useFetchProfile();
  const { credentials, mutate, isPending } = useFetchOrdersById(
    status || "pending",
    profileData?.id || 6
  );

  const preparedTitle = (status: OrderStatus) => FLAG[status];

  useEffect(() => {
    if (isSuccess && profileData?.id) {
      mutate({
        status: "PENDING",
        user_id: profileData?.id || 1,
      });
    }
  }, [isSuccess]);

  if (profileLoading || isPending) return <LoadingScreen />;
  if (profileError) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
    return <ErrorScreen />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: `To ${preparedTitle(status as any)}`,
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
        }}
      />

      <BaseLayout>
        <View className="flex-1 px-2 pt-4">
          <>
            {credentials.length > 0 ? (
              <FlashList
                data={credentials}
                estimatedItemSize={5000}
                renderItem={({ item }: { item: any }) => (
                  <OrderHistoryCard {...item} order_status={status} />
                )}
              />
            ) : (
              <EmptyReview />
            )}
          </>
        </View>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
