import CategoryEmpty from "@/app/cart/list/components/CategoryEmpty";
import BackButton from "@/components/atoms/button/BackButton";
import OrderHistoryCard from "@/components/molecules/card/OrderHistoryCard";
import EmptyReview from "@/components/molecules/review/EmptyReview";
import YStack from "@/components/stacks/YStack";
import { OrderDataSet } from "@/data/order.data";
import useOrderReview from "@/hooks/order/useOrderReview";
import { ProductItem } from "@/interface/product.interface";
import BaseLayout from "@/layout/BaseLayout";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";
import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const RootScreen = () => {
  const { status } = useLocalSearchParams();
  const { data, isLoading, isError } = useOrderReview();

  const preparedTitle =
    (status as string) === "history"
      ? "Order History"
      : `To ${(status[0].toUpperCase() + status.slice(1)) as string}`;

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  console.log(data);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: preparedTitle,
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
            {data.length > 0 ? (
              <FlashList
                data={data}
                estimatedItemSize={5000}
                numColumns={2}
                renderItem={({ item }: { item: any }) => (
                  <OrderHistoryCard {...item} />
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
