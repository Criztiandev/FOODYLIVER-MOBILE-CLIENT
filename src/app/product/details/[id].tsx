import React from "react";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { ProductItem } from "@/interface/product.interface";
import XStack from "@/components/stacks/XStack";
import ProductActions from "./components/ProductActions";
import ProductQuantity from "./components/ProductQuantity";
import ProductAddons from "./components/ProductAddons";
import ProductHero from "./components/ProductHero";
import BackButton from "@/components/atoms/button/BackButton";
import CartButton from "@/components/atoms/button/CartButton";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { useFetchProductById } from "@/hooks/product/query";

const RootScreen = () => {
  const { id } = useLocalSearchParams();

  const {
    isLoading,
    isError,
    error,
    data: result,
  } = useFetchProductById(id as string);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }
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
      <SafeAreaView className="flex-1 bg-white relative ">
        <ScrollView className="flex-grow  relative">
          <View style={{ height: Dimensions.get("screen").height - 120 }}>
            <View>
              <ProductHero {...result?.data} />
            </View>
            <View>
              <ProductAddons />
              <ProductQuantity {...result?.data} />
            </View>

            <View className="absolute bottom-0 left-0 w-full">
              <ProductActions {...result?.data} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RootScreen;
