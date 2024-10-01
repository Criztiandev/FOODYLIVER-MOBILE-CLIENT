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

const RootScreen = () => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <>
      <BaseLayout>
        <YStack className="flex-1 h-[90vh] space-y-4  relative justify-between items-center">
          <ProductHeader />

          <YStack className=" px-2 mb-4">
            <ProductHero />
            <ProductAddons />
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
          </YStack>

          <View className="absolute w-full bottom-0 px-2">
            <ProductActions
              product={{
                id: "123123",
                name: "Product 1",
                price: 3000,
                rating: 5.0,
                thumbnailUrl: "12312312312",
                addons: [],
              }}
              quantity={quantity}
            />
          </View>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
