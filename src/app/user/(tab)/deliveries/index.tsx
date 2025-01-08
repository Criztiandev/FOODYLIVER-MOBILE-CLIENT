import React, { useEffect, useMemo, useState, useCallback } from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Stack, useRouter } from "expo-router";
import { Text, View, RefreshControl, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import { User } from "@/interface/user.interface";
import { useFetchOrderByRider } from "@/hooks/delivery/useFetchOrderByRider";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import EmptyReview from "@/components/molecules/review/EmptyReview";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import { Mail, Phone, Receipt, Wallet, MapPin } from "lucide-react-native";
import useDeliverOrder from "@/hooks/order/useDeliverOrder";
import OrderCard from "@/components/molecules/card/OrderCard";

// Memoized header options with improved styling
const screenOptions = {
  title: "Delivery History",

  headerTitleStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  headerStyle: {
    backgroundColor: "#FF7C02",
  },
  headerShadowVisible: false,
};

const RootScreen = () => {
  const [credentials, setCredentials] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { getItem } = useLocalStorage();

  const {
    isLoading: isOrderQueryLoading,
    isError: isOrderQueryError,
    data: OrderQueryResult,
    refetch,
  } = useFetchOrderByRider(credentials?.user_id || "3");

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

  const notDeliveredOrders = useMemo(() => {
    if (!OrderQueryResult) return [];
    return OrderQueryResult.filter((order: any) => order?.status === "ONGOING");
  }, [OrderQueryResult]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <OrderCard item={item} />,
    []
  );

  useEffect(() => {
    let isMounted = true;

    const fetchCredentials = async () => {
      const userCredentials = await getItem("user");
      if (isMounted && userCredentials) {
        setCredentials(userCredentials as User);
      }
    };

    fetchCredentials();

    return () => {
      isMounted = false;
    };
  }, [getItem]);

  if (isOrderQueryLoading) return <LoadingScreen />;
  if (isOrderQueryError) return <ErrorScreen />;

  return (
    <>
      <Stack.Screen options={screenOptions as any} />
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
            {notDeliveredOrders.length > 0 ? (
              <FlashList
                data={notDeliveredOrders}
                renderItem={renderItem}
                estimatedItemSize={200}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                onEndReachedThreshold={0.5}
                onEndReached={onRefresh}
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
