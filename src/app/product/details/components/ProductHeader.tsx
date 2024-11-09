import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import XStack from "@/components/stacks/XStack";
import CartButton from "@/components/atoms/button/CartButton";
import BackButton from "@/components/atoms/button/BackButton";
import NotificationButton from "@/components/atoms/button/NotificationButton";

const ProductHeader = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <XStack className="space-x-4">
              <View className="mr-2">
                <NotificationButton />
              </View>
              <CartButton />
            </XStack>
          ),
        }}
      />
    </>
  );
};

export default ProductHeader;
