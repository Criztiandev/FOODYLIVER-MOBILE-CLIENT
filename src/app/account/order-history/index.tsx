import React, { useCallback, useState } from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Stack } from "expo-router";
import { View, RefreshControl, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import EmptyReview from "@/components/molecules/review/EmptyReview";
import OrderCard from "@/components/molecules/card/OrderCard";
import BackButton from "@/components/atoms/button/BackButton";
import { useFetchOrderByRider } from "@/hooks/delivery/useFetchOrderByRider";
import { Order } from "@/interface/order.interface";

interface OrderResponse {
  data: Order[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
}

const screenOptions = {
  title: "Delivery Orders",
  headerLeft: () => <BackButton />,
  headerTitleStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600" as const,
  },
  headerStyle: {
    backgroundColor: "#FF7C02",
  },
  headerShadowVisible: false,
};

const RootScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading,
    isError,
    data: orders,
    refetch,
  } = useFetchOrderByRider("3");

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const deliveredOrders = orders?.filter(
    (order: Order) => order?.status === "DELIVERED"
  );

  console.log(orders);

  const renderItem = useCallback(
    ({ item }: { item: Order }) => <OrderCard item={item} />,
    []
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <>
      <Stack.Screen options={screenOptions} />
      <BaseLayout>
        <ScrollView
          className="flex-1 bg-gray-50"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#FF7C02"]}
              tintColor="#FF7C02"
              progressViewOffset={10}
              progressBackgroundColor="#ffffff"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-4 pt-4 border border-gray-200">
            {deliveredOrders.length > 0 ? (
              <FlashList
                data={deliveredOrders}
                renderItem={renderItem}
                estimatedItemSize={200}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                onEndReachedThreshold={0.5}
                onEndReached={onRefresh}
                onRefresh={onRefresh}
                refreshing={refreshing}
              />
            ) : (
              <EmptyReview />
            )}
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default React.memo(RootScreen);
