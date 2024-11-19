import React from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Stack, useRouter } from "expo-router";
import XStack from "@/components/stacks/XStack";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SearchIcon } from "lucide-react-native";
import Input from "@/components/ui/Input";
import CartButton from "@/components/atoms/button/CartButton";
import NotificationButton from "@/components/atoms/button/NotificationButton";
import TopCategoriesList from "@/components/organism/product/TopCategoriesList";
import PromotionalList from "@/components/organism/product/PromotionalList";
import ProductList from "@/components/organism/product/ProductList";
import Avatar from "@/components/ui/Avatar";

const RootScreen = () => {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#F4891F",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => console.log("Eastern Egg")}>
              <Avatar size={42} />
            </TouchableOpacity>
          ),
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
        <ScrollView style={{ flexGrow: 1, marginBottom: 48 }}>
          <View className=" bg-primary">
            <View className="bg-[#EDEDED] mx-2 border border-gray-300  flex-row  items-center my-4 rounded-full px-4">
              <SearchIcon color="black" size={22} opacity={0.7} />
              <Input
                className="border-transparent"
                placeholder="What are your cravings for today?"
              />
            </View>
          </View>

          <TopCategoriesList />
          <PromotionalList />
          <ProductList />
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
