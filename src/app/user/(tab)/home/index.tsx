import React from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Stack, useRouter } from "expo-router";
import XStack from "@/components/stacks/XStack";
import { View } from "react-native";
import { SearchIcon } from "lucide-react-native";
import Input from "@/components/ui/Input";
import CartButton from "@/components/atoms/button/CartButton";
import NotificationButton from "@/components/atoms/button/NotificationButton";
import TopCategoriesList from "@/components/organism/product/TopCategoriesList";
import PromotionalList from "@/components/organism/product/PromotionalList";
import ProductList from "@/components/organism/product/ProductList";

const RootScreen = () => {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerRight: () => (
            <XStack className="">
              <NotificationButton />
              <CartButton />
            </XStack>
          ),
        }}
      />
      <BaseLayout>
        <View className="bg-[#EDEDED] mx-2 px-2 border border-gray-300 rounded-md flex-row  items-center my-4">
          <SearchIcon color="black" size={22} opacity={0.7} />
          <Input
            className="border-transparent"
            placeholder="What are your cravings for today?"
          />
        </View>

        <TopCategoriesList />
        <PromotionalList />
        <ProductList />
      </BaseLayout>
    </>
  );
};

export default RootScreen;
