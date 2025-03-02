import { View } from "react-native";
import React from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import BackButton from "@/components/atoms/button/BackButton";
import { ProductItem } from "@/interface/product.interface";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import { useFetchCategoryList } from "@/hooks/product/query";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import ProductCard from "@/components/atoms/card/ProductCard";
import CategoryEmpty from "@/app/cart/list/components/CategoryEmpty";
import { StyleSheet } from "react-native";

const RootScreen = () => {
  const { status } = useLocalSearchParams();

  const {
    isLoading,
    isError,
    data: result,
    error,
  } = useFetchCategoryList((status as any) || "");

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Categories",
          headerLeft: () => <BackButton />,
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
        }}
      />
      <BaseLayout>
        <View style={styles.container}>
          <>
            {result.length > 0 ? (
              <FlashList
                data={result}
                estimatedItemSize={5000}
                numColumns={2}
                renderItem={({ item }: { item: ProductItem }) => (
                  <ProductCard status={status as string} {...item} />
                )}
              />
            ) : (
              <CategoryEmpty />
            )}
          </>
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
