import React from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Stack } from "expo-router";
import XStack from "@/components/stacks/XStack";
import { ScrollView } from "react-native";
import CartButton from "@/components/atoms/button/CartButton";
import TopCategoriesList from "@/components/organism/product/TopCategoriesList";
import PromotionalList from "@/components/organism/product/PromotionalList";
import ProductList from "@/components/organism/product/ProductList";

const RootScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#F4891F",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <XStack className="">
              <CartButton />
            </XStack>
          ),
        }}
      />
      <BaseLayout>
        <ScrollView style={{ flexGrow: 1, marginBottom: 48 }}>
          <TopCategoriesList />
          <PromotionalList />
          <ProductList />
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
