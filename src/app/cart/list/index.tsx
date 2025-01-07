import BackButton from "@/components/atoms/button/BackButton";
import useCartStore from "@/state/useCartStore";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import CartEmpty from "./components/CartEmpty";
import CartSelectedProducts from "./components/CartSelectedProduct";
import Button from "@/components/ui/Button";
import { Coins, ShoppingBag, Truck, Wallet } from "lucide-react-native";
import Avatar from "@/components/ui/Avatar";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import { User } from "@/interface/user.interface";

const SHIPPING_FEE = 50;

const RootScreen = () => {
  const [credentials, setCredentials] = useState<User | any>([]);
  const { items, calculateSubtotal } = useCartStore();
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const currentSubtotal = calculateSubtotal();
    setSubtotal(currentSubtotal);
    setTotal(currentSubtotal + SHIPPING_FEE);
  }, [items, calculateSubtotal]);

  useEffect(() => {
    (async () => {
      const credentials = await getItem("user");
      if (credentials) {
        setCredentials(credentials);
      }
    })();
  }, []);

  const renderCheckoutItem = (
    icon: React.ReactNode,
    label: string,
    value: number
  ) => (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center space-x-2">
        {icon}
        <Text className="text-base font-semibold text-gray-600">{label}</Text>
      </View>
      <Text className="text-base font-semibold text-gray-600">
        ₱{value.toFixed(2)}
      </Text>
    </View>
  );

  if (!items?.length) {
    return (
      <>
        <Stack.Screen options={stackScreenOptions as any} />
        <CartEmpty />
      </>
    );
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={stackScreenOptions as any} />

      <SafeAreaView className="flex-1 bg-white">
        {/* User Profile Header */}
        <View className="bg-primary p-4 flex-row items-center space-x-4">
          <Avatar
            size={64}
            source={require("@/assets/images/girl-user.png")}
            className="border-2 border-white"
          />
          <View className="flex-1">
            <Text className="text-xl font-bold text-white capitalize">
              {credentials?.name || "Yen Timmango"}
            </Text>
            <Text className="text-base text-white/70">
              {credentials?.address || "Block 56, Lot 14, Villa Luisa North"}
            </Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 200 }}
        >
          <View className="mt-2">
            <CartSelectedProducts />
          </View>
        </ScrollView>

        {/* Checkout Section */}
        <SafeAreaView className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <View className="space-y-2 mb-2">
            {renderCheckoutItem(
              <Truck color="black" size={18} />,
              "Shipping Fee",
              SHIPPING_FEE
            )}
            {renderCheckoutItem(
              <Coins color="black" size={18} />,
              "Sub Total",
              subtotal
            )}
            {renderCheckoutItem(
              <Wallet color="black" size={18} />,
              "Total",
              total
            )}
          </View>

          <Button
            className="bg-primary py-3"
            onPress={() => router.push("/order/payment")}
          >
            <View className="flex-row items-center justify-center space-x-2">
              <ShoppingBag color="white" size={18} />
              <Text className="text-lg font-semibold text-white">Checkout</Text>
            </View>
          </Button>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};

const stackScreenOptions = {
  headerLeft: () => <BackButton />,
  title: "My Cart",
  headerTitleStyle: { color: "white", fontSize: 18, fontWeight: "600" },
  headerStyle: {
    backgroundColor: "#f4891f",
  },
  headerTitleAlign: "center",
};

export default RootScreen;
