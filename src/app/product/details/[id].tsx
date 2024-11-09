import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import React, { useState } from "react";
import ProductHero from "./components/ProductHero";
import ProductAddons from "./components/ProductAddons";
import ProductQuantity from "./components/ProductQuantity";
import ProductActions from "./components/ProductActions";
import ProductHeader from "./components/ProductHeader";
import useCartStore from "@/state/useCartStore";
import useProductStore from "@/state/useProductStore";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useFetchProductById } from "@/hooks/product/query";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import Toast from "react-native-toast-message";

const RootScreen = () => {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

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
  const product = result.data;

  const handleSelectAddons = (name: string) => {
    setSelectedAddons((prev) => {
      if (prev.includes(name)) {
        const filtered = prev.filter((filter) => filter !== name);
        return filtered;
      }
      return [...prev, name];
    });
  };

  return (
    <>
      <BaseLayout>
        <YStack className="flex-1  space-y-4  relative justify-between items-center">
          <ProductHeader />

          <YStack className=" px-2 mb-4">
            <ProductHero {...product} />
            <ProductAddons
              selected={selectedAddons}
              onSelect={handleSelectAddons}
              {...product}
            />
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
          </YStack>

          <ProductActions product={result.data} quantity={quantity} />
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
