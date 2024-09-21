import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import React from "react";
import ProductHero from "./components/ProductHero";
import ProductAddons from "./components/ProductAddons";
import ProductQuantity from "./components/ProductQuantity";
import ProductActions from "./components/ProductActions";
import ProductHeader from "./components/ProductHeader";

const RootScreen = () => {
  return (
    <>
      <BaseLayout>
        <ProductHeader />
        <YStack className="px-2">
          <ProductHero />
          <ProductAddons />
          <ProductQuantity />
          <ProductActions />
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
