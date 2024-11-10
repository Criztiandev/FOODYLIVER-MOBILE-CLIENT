import YStack from "@/components/stacks/YStack";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { ProductItem } from "@/interface/product.interface";
import { Image } from "expo-image";
import XStack from "@/components/stacks/XStack";
import { Box, MinusIcon, Plus, PlusIcon, Star, Tag } from "lucide-react-native";
import Button from "@/components/ui/Button";
import ProductActions from "./components/ProductActions";
import ProductQuantity from "./components/ProductQuantity";
import ProductAddons from "./components/ProductAddons";
import ProductHero from "./components/ProductHero";
import BackButton from "@/components/atoms/button/BackButton";
import CartButton from "@/components/atoms/button/CartButton";
import useCartStore from "@/state/useCartStore";
const RootScreen = () => {
  const { id } = useLocalSearchParams();

  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: result,
  // } = useFetchProductById(id as string);

  // if (isLoading) return <LoadingScreen />;
  // if (isError) {
  //   console.log(error);
  //   return <ErrorScreen />;
  // }
  const product: ProductItem = {
    name: "Product 1",
    price: 1000,
    description:
      "When the Text component doesn't support changing default fonts out of the box, this solution becomes much better. I would much rather add a global control in one place and use the native components than make a wrapper component for every detail that true native apps provide.",
    rating: 1,
    category_id: "1",
    addons: [],
    stocks: 2,
    is_available: true,
    thumbnailUrl: "123123123",
    id: "1",
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <XStack className="space-x-4">
              <CartButton />
            </XStack>
          ),
        }}
      />
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1">
          <View className="px-2">
            <ProductHero {...product} />
            <ProductAddons />
            <ProductQuantity {...product} />
            <ProductActions {...product} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RootScreen;
