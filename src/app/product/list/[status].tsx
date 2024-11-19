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
import { useFetchProductList } from "@/hooks/product/query";
import LoadingScreen from "@/layout/screen/LoadingScreen";

const RootScreen = () => {
  const { status } = useLocalSearchParams();
  const { addProduct } = useCartStore();
  const router = useRouter();

  const { isLoading, isError, data: result, error } = useFetchProductList();

  if (isLoading) return <LoadingScreen />;

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
          title: `${status[0].toUpperCase() + status.slice(1)}`,
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
          <FlashList
            data={result.data}
            estimatedItemSize={5000}
            numColumns={2}
            renderItem={({ item }: { item: ProductItem }) => (
              <TouchableOpacity
                className="relative"
                onPress={() => handleViewDetails(item)}
              >
                <XStack className=" absolute top-1  w-full  p-2 px-3 justify-between items-center flex-1 z-[99px]">
                  <TouchableOpacity>
                    <Heart color="#F4891F" size={28} />
                  </TouchableOpacity>

                  <View className="w-[32px] h-[32px] rounded-full bg-primary flex justify-center items-center ">
                    <Text className="text-sm font-bold text-white">{5}</Text>
                  </View>
                </XStack>

                <View className="bg-primary/40 relative p-4 flex-2 flex-1   rounded-md m-1 justify-center items-center space-y-4">
                  <View className="mt-6">
                    <Avatar
                      size={100}
                      source={require("@/assets/images/cooking-img.png")}
                    />
                  </View>
                  <XStack className="items-center justify-between w-full">
                    <YStack>
                      <Text className="font-bold text-[24px]">
                        {item.name || "Burger"}
                      </Text>
                      <XStack className="items-center">
                        <DollarSign color="black" size={18} />
                        <Text className="text-[16px] font-bold">
                          {item.price || 0}
                        </Text>
                      </XStack>
                    </YStack>

                    <TouchableOpacity onPress={() => handleAddToCart(item)}>
                      <ShoppingCart size={24} color="#F4891F" />
                    </TouchableOpacity>
                  </XStack>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
