import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import ProductActions from "./components/ProductActions";
import ProductQuantity from "./components/ProductQuantity";
import ProductHero from "./components/ProductHero";
import BackButton from "@/components/atoms/button/BackButton";
import CartButton from "@/components/atoms/button/CartButton";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import BaseLayout from "@/layout/BaseLayout";
import {
  useFetchCategoryList,
  useFetchProductById,
} from "@/hooks/product/query";
import useCartStore from "@/state/useCartStore";
import AddonsCard from "@/components/molecules/card/AddonsCard";

interface ProductDetailScreenProps {
  maxQuantity?: number;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  maxQuantity = 99,
}) => {
  const { id, status } = useLocalSearchParams<{ id: string; status: string }>();
  console.log(useLocalSearchParams());
  const { items } = useCartStore();
  const { isLoading, isError, data: result } = useFetchProductById(id);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    data: resultCategory,
    error: errorCategory,
  } = useFetchCategoryList("5");

  console.log(status);

  const selectedProduct = items.find((item) => item.id === id);

  const handleIncrement = () => {
    if (currentQuantity < maxQuantity) {
      setCurrentQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity((prev) => prev - 1);
    }
  };

  if (isLoading || isLoadingCategory) return <LoadingScreen />;
  if (isError || isErrorCategory) return <ErrorScreen />;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <XStack>
              <CartButton />
            </XStack>
          ),
        }}
      />

      <BaseLayout>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <YStack style={styles.contentContainer}>
            {result?.data && <ProductHero {...result.data} />}

            <ProductQuantity
              quantity={currentQuantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </YStack>

          {/* Replace static category container with the CategoryCard component */}
          {status !== "5" && (
            <AddonsCard categories={resultCategory} title="Addons" />
          )}
        </ScrollView>

        <View style={styles.footer}>
          {result?.data && (
            <ProductActions
              quantity={currentQuantity}
              onQuantityChange={setCurrentQuantity}
              {...result.data}
            />
          )}
        </View>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#f4891f",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e7e5e4",
  },
});

export default ProductDetailScreen;
