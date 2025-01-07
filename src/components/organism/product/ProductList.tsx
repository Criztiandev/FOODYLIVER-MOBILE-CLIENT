import { View, Text } from "react-native";
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
    <Text
      className={`text-lg font-semibold ${
        isSelected ? "text-primary" : "text-gray-400"
      }`}
    >
      {title}
    </Text>
  </Button>
);

const EmptyState = () => (
  <View className="h-[300px] flex-1 justify-center items-center border border-stone-400 w-full rounded-md opacity-70">
    <Text className="font-semibold text-lg">No Available Products</Text>
  </View>
);

const ErrorState = () => (
  <View className="h-[200px] bg-stone-200">
    <View className="h-full flex-1 justify-center items-center border border-stone-400 w-full rounded-md opacity-70">
      <Text className="font-semibold text-lg">Something went wrong</Text>
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
      <View className="px-2 mb-4 space-y-2">
        <XStack className="items-center space-x-2 mb-2">
          {categories.map((item) => (
            <CategoryHeader
              key={item.title}
              title={item.title}
              isSelected={selectedCategory === item.title}
            />
          ))}
        </XStack>
        <SectionLoadingScreen />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="px-2">
        <XStack className="items-center space-x-2">
          {categories.map((item) => (
            <CategoryHeader
              key={item.title}
              title={item.title}
              isSelected={selectedCategory === item.title}
            />
          ))}
        </XStack>
        <ErrorState />
      </View>
    );
  }

  return (
    <YStack className="flex-1 mb-4">
      <XStack className="items-center space-x-2 mb-2 px-4">
        <Text className="text-xl font-bold text-primary">All Products</Text>
      </XStack>
      <View className="flex-1 px-2">
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

export default ProductList;
