import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
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
import useCartStore from "@/state/useCartStore";

interface ProductDetailScreenProps {
  maxQuantity?: number;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  maxQuantity = 99,
}) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { items } = useCartStore();

  const {
    isLoading,
    isError,
    error,
    data: result,
    refetch,
  } = useFetchProductById(id);

  // Sync with cart quantity when component mounts or cart items change
  useEffect(() => {
    if (id) {
      const cartItem = items.find((item) => item.id === id);
      if (cartItem) {
        setSelectedQuantity(cartItem.quantity);
      }
    }
  }, [id, items]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleError = () => {
    console.error("Error fetching product:", error);
    return <ErrorScreen />;
  };

  if (!id) {
    router.replace("/user/home");
    return null;
  }

  if (isLoading) return <LoadingScreen />;
  if (isError) return handleError();

  const product = result?.data;
  if (!product) return handleError();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
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

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          overScrollMode="never"
        >
          <View style={styles.content}>
            <ProductHero {...product} />
            <ProductAddons />
            <ProductQuantity
              id={product.id}
              quantity={selectedQuantity}
              onQuantityChange={handleQuantityChange}
              maxQuantity={maxQuantity}
              selectedQuantity={selectedQuantity}
            />
          </View>
        </ScrollView>

        <SafeAreaView style={styles.bottomActions}>
          <ProductActions quantity={selectedQuantity} {...product} />
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#f4891f",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
  },
  bottomActions: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});

export default ProductDetailScreen;
