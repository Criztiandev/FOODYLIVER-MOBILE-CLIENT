import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { FlashList } from "@shopify/flash-list";
import Button from "@/components/ui/Button";
import { ProductItem } from "@/interface/product.interface";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";
import ProductCard from "@/components/atoms/card/ProductCard";
import { useFetchProductList } from "@/hooks/product/query";

const PRODUCTS_PER_PAGE = 15;

const CategoryHeader = ({
  title,
  isSelected,
  onPress,
}: {
  title: string;
  isSelected: boolean;
  onPress?: () => void;
}) => (
  <Button variant="ghost" onPress={onPress}>
    <Text style={[styles.categoryText, isSelected && styles.selectedCategory]}>
      {title}
    </Text>
  </Button>
);

const EmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>No Available Products</Text>
  </View>
);

const ErrorState = () => (
  <View style={styles.errorContainer}>
    <View style={styles.errorInnerContainer}>
      <Text style={styles.errorText}>Something went wrong</Text>
    </View>
  </View>
);

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const { isLoading, isError, data: result } = useFetchProductList();
  const categories = [{ title: "All Products" }];

  const limitedProducts = result?.data?.slice(0, PRODUCTS_PER_PAGE);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <XStack style={styles.categoryHeaderContainer}>
          {categories.map((item) => (
            <CategoryHeader
              key={item.title}
              title={item.title}
              isSelected={selectedCategory === item.title}
              onPress={() => setSelectedCategory(item.title)}
            />
          ))}
        </XStack>
        <SectionLoadingScreen />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorWrapper}>
        <XStack style={styles.categoryHeaderContainer}>
          {categories.map((item) => (
            <CategoryHeader
              key={item.title}
              title={item.title}
              isSelected={selectedCategory === item.title}
              onPress={() => setSelectedCategory(item.title)}
            />
          ))}
        </XStack>
        <ErrorState />
      </View>
    );
  }

  return (
    <YStack style={styles.container}>
      <XStack style={styles.titleContainer}>
        <Text style={styles.titleText}>All Products</Text>
      </XStack>
      <View style={styles.listContainer}>
        {result?.data?.length > 0 ? (
          <FlashList
            data={limitedProducts}
            estimatedItemSize={200}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: ProductItem }) => (
              <ProductCard {...item} />
            )}
          />
        ) : (
          <EmptyState />
        )}
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  loadingContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorWrapper: {
    paddingHorizontal: 8,
  },
  categoryHeaderContainer: {
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F4891F",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  selectedCategory: {
    color: "#F4891F",
  },
  emptyStateContainer: {
    height: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#78716C",
    borderRadius: 6,
    opacity: 0.7,
  },
  emptyStateText: {
    fontWeight: "600",
    fontSize: 18,
  },
  errorContainer: {
    height: 200,
    backgroundColor: "#E5E7EB",
  },
  errorInnerContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#78716C",
    borderRadius: 6,
    opacity: 0.7,
  },
  errorText: {
    fontWeight: "600",
    fontSize: 18,
  },
});

export default ProductList;
