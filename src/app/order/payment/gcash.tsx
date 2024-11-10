import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import BackButton from "@/components/atoms/button/BackButton";
import Button from "@/components/ui/Button";
import XStack from "@/components/stacks/XStack";
import { ShoppingBag } from "lucide-react-native";
import { WebView } from "react-native-webview";
import useCartStore from "@/state/useCartStore";

const RootScreen = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();

  const handlePlaceOrder = () => {
    clearCart();
    router.replace("/order/delivery");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Gcash Payment`",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <View className="flex-1 ">
        <WebView
          style={{ flex: 1 }}
          source={{ uri: "https://www.gcash.com/" }}
        />
      </View>

      <View className="p-4 absolute bottom-0 w-full space-y-4">
        <Button onPress={handlePlaceOrder}>
          <XStack className="space-x-2 items-center">
            <ShoppingBag color="white" size={18} />
            <Text className="text-lg font-semibold text-white">
              Place order
            </Text>
          </XStack>
        </Button>
      </View>
    </>
  );
};

export default RootScreen;
