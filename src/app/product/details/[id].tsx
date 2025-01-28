import React, { useEffect, useState } from "react";
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
  const [currentQuantity, setCurrentQuantity] = useState(1);

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

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

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
            <XStack style={styles.headerRight}>
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
              quantity={selectedProduct?.quantity || currentQuantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </YStack>
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
