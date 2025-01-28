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
import React, { useCallback, useEffect, useState } from "react";
import { View, RefreshControl, StyleSheet } from "react-native";

const FLAG = {
  pending: "Accepted",
  ongoing: "Deliver",
  delivered: "Complete",
  history: "Order History",
} as const;
type OrderStatus = keyof typeof FLAG;

const RootScreen = () => {
  const { status } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await mutate({
        status:
          (Array.isArray(status) ? status[0] : status)?.toUpperCase() ||
          "PENDING",
        user_id: profileData?.id || 1,
      });
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [status, profileData?.id, mutate]);

  useEffect(() => {
    if (isSuccess && profileData?.id) {
      mutate({
        status:
          (Array.isArray(status) ? status[0] : status)?.toUpperCase() ||
          "PENDING",
        user_id: profileData?.id || 1,
      });
    }
  }, [isSuccess, status, profileData?.id]);

  if (profileLoading || isPending) return <LoadingScreen />;
  if (profileError) {
    if (error instanceof AxiosError) {
      console.error("Profile Error:", error.response);
    }
    return <ErrorScreen />;
  }

  console.log(credentials);

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
        <View style={styles.container}>
          {credentials.length > 0 ? (
            <FlashList
              data={credentials}
              estimatedItemSize={5000}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }: { item: any }) => (
                <OrderHistoryCard {...item} order_status={status} />
              )}
            />
          ) : (
            <EmptyReview />
          )}
        </View>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
  },
});

export default RootScreen;
