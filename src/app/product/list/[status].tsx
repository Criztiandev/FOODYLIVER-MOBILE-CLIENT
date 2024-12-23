import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Href, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/components/stacks/XStack";
import { DollarSign, Heart, ShoppingCart } from "lucide-react-native";
import Avatar from "@/components/ui/Avatar";
import YStack from "@/components/stacks/YStack";
import BackButton from "@/components/atoms/button/BackButton";
import useCartStore from "@/state/useCartStore";
import { CartItem } from "@/interface/cart.interface";
import { ProductItem } from "@/interface/product.interface";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import {
  useFetchCategoryList,
  useFetchProductList,
} from "@/hooks/product/query";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import ProductCard from "@/components/atoms/card/ProductCard";
import CategoryEmpty from "@/app/cart/list/components/CategoryEmpty";

const RootScreen = () => {
  const { status } = useLocalSearchParams();
  const { addProduct } = useCartStore();
  const router = useRouter();

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

  const handleViewDetails = (item: ProductItem) => {
    router.navigate(`/product/details/${item.id}` as Href);
  };

  const handleAddToCart = (item: ProductItem) => {
    addProduct(item, 1);
  };

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
        <View className="flex-1 px-2 pt-4">
          <>
            {result.length > 0 ? (
              <FlashList
                data={result}
                estimatedItemSize={5000}
                numColumns={2}
                renderItem={({ item }: { item: ProductItem }) => (
                  <ProductCard {...item} />
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

export default RootScreen;
