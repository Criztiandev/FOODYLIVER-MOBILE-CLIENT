import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import ProductActions from "./components/ProductActions";
import ProductQuantity from "./components/ProductQuantity";
import ProductAddons from "./components/ProductAddons";
import ProductHero from "./components/ProductHero";
import BackButton from "@/components/atoms/button/BackButton";
import CartButton from "@/components/atoms/button/CartButton";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import BaseLayout from "@/layout/BaseLayout";
import { useFetchProductById } from "@/hooks/product/query";
import useCartStore from "@/state/useCartStore";

interface ProductDetailScreenProps {
  maxQuantity?: number;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  maxQuantity = 99,
}) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items, updateQuantity, addProduct } = useCartStore();
  const { isLoading, isError, error, data: result } = useFetchProductById(id);

  // Early returns for error states
  if (!id) {
    router.replace("/user/home");
    return null;
  }

  if (isLoading) return <LoadingScreen />;
  if (isError || !result?.data) {
    console.error("Error fetching product:", error);
    return <ErrorScreen />;
  }

  const product = result.data;
  const currentItem = items.find((item) => item.id === id);
  const currentQuantity = currentItem?.quantity || 1;

  const handleQuantityChange = (newQuantity: number) => {
    if (!id) return;
    const validatedQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));

    const existingItem = items.find((item) => item.id === id);
    if (existingItem) {
      updateQuantity(id, validatedQuantity);
    } else {
      addProduct(product, validatedQuantity);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerTitleStyle: { color: "white", fontSize: 18, fontWeight: "600" },
          headerStyle: { backgroundColor: "#f4891f" },
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

      <BaseLayout>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <YStack className="p-2 space-y-6">
            <ProductHero {...product} />

            <YStack className="space-y-4">
              <ProductAddons />
            </YStack>

            <YStack className="space-y-4">
              <ProductQuantity
                id={product.id}
                maxQuantity={maxQuantity}
                {...product}
              />
            </YStack>
          </YStack>
        </ScrollView>

        <View className="p-4 border-t border-stone-200">
          <ProductActions
            quantity={currentQuantity}
            onQuantityChange={handleQuantityChange}
            {...product}
          />
        </View>
      </BaseLayout>
    </>
  );
};

export default ProductDetailScreen;
