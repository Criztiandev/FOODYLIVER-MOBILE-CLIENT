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

const RootScreen = () => {
  const { getProductDetails } = useCartStore();
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <>
      <BaseLayout>
        <ProductHeader />
        <YStack className="px-2">
          <ProductHero />
          <ProductAddons />
          <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
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
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
