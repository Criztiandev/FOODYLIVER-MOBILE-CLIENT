import { View, Text } from "react-native";
import React, { useState } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { FlashList } from "@shopify/flash-list";
import Button from "@/components/ui/Button";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Heart, ShoppingCart } from "lucide-react-native";
import { Href } from "expo-router";
import Avatar from "@/components/ui/Avatar";
import { useFetchProductList } from "@/hooks/product/query";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { ProductItem } from "@/interface/product.interface";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";
import ProductCard from "@/components/atoms/card/ProductCard";

const ProductList = () => {
  const [selectCategory, setSelectedCategory] = useState("All");
  const { isLoading, isError, data: result, error } = useFetchProductList();

  const categories = [
    { title: "All" },
    { title: "RECOMMENDED" },
    { title: "POPULAR" },
  ];

  if (isLoading)
    return (
      <View className="px-2 mb-4 space-y-2">
        <View className="flex-row justify-between items-center mb-2 ">
          <XStack className="items-center space-x-2">
            {categories.map((item) => (
              <Button variant="ghost">
                <Text
                  className={`text-lg font-semibold  ${
                    selectCategory === item.title
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                >
                  {item.title}
                </Text>
              </Button>
            ))}
          </XStack>
        </View>

        <SectionLoadingScreen />
      </View>
    );
  if (isError) {
    return (
      <View className="px-2">
        <XStack className="items-center space-x-2">
          {categories.map((item) => (
            <Button variant="ghost" className="">
              <Text
                className={`text-lg font-semibold  ${
                  selectCategory === item.title
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                {item.title}
              </Text>
            </Button>
          ))}
        </XStack>

        <View className="h-[200px] bg-stone-200">
          <View className=" h-full flex-1 justify-center items-center border border-stone-400 w-full rounded-md opcity-70 ">
            <Text className="font-semibold text-lg">Something went wrong</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <YStack className="flex-1 mb-4">
      <FlashList
        data={categories}
        estimatedItemSize={2000}
        horizontal
        renderItem={({ item }) => (
          <Button
            variant="ghost"
            onPress={() => setSelectedCategory(item.title)}
          >
            <Text
              className={`text-lg font-semibold  ${
                selectCategory === item.title ? "text-primary" : "text-gray-400"
              }`}
            >
              {item.title}
            </Text>
          </Button>
        )}
      />

      <View className="flex-1 px-2 ">
        {result?.data?.length > 0 ? (
          <FlashList
            data={result.data}
            estimatedItemSize={9999}
            numColumns={2}
            renderItem={({ item }: { item: ProductItem }) => (
              <ProductCard {...item} />
            )}
          />
        ) : (
          <View className="h-[300px] flex-1 justify-center items-center border border-stone-400 w-full rounded-md opcity-70">
            <Text className="font-semibold text-lg">No Available Products</Text>
          </View>
        )}
      </View>
    </YStack>
  );
};

export default ProductList;
