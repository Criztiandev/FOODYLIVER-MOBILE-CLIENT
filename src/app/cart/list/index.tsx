import BackButton from "@/components/atoms/button/BackButton";
import useCartStore from "@/state/useCartStore";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import CartEmpty from "./components/CartEmpty";
import YStack from "@/components/stacks/YStack";
import CartSelectedProducts from "./components/CartSelectedProduct";
import Button from "@/components/ui/Button";
import { Coins, Ship, ShoppingBag, Truck, Wallet } from "lucide-react-native";
import XStack from "@/components/stacks/XStack";
import Avatar from "@/components/ui/Avatar";
import useAccountStore from "@/state/useAccountStore";

const SHIPPING_FEE = 50;

const RootScreen = () => {
  const { credentials } = useAccountStore();
  const { items, calculateSubtotal } = useCartStore();
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const currentSubtotal = calculateSubtotal();
    setSubtotal(currentSubtotal);
    setTotal(currentSubtotal + SHIPPING_FEE);
  }, [items, calculateSubtotal]);

  const renderCheckoutItem = (
    icon: React.ReactNode,
    label: string,
    value: number
  ) => (
    <View style={styles.checkoutRow}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <Text style={styles.valueText}>₱{value.toFixed(2)}</Text>
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
    <View style={styles.container}>
      <Stack.Screen options={stackScreenOptions as any} />

      <SafeAreaView style={styles.safeArea}>
        {/* User Profile Header */}
        <View style={styles.profileHeader}>
          <Avatar size={64} source={require("@/assets/images/girl-user.png")} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {credentials?.name || "Yen Timmango"}
            </Text>
            <Text style={styles.profileAddress}>
              {credentials?.address || "Block 56, Lot 14, Villa Luisa North"}
            </Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.cartItemsContainer}>
            <CartSelectedProducts />
          </View>
        </ScrollView>

        {/* Checkout Section */}
        <SafeAreaView style={styles.checkoutContainer}>
          <View style={styles.summaryContainer}>
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
            style={styles.checkoutButton}
            onPress={() => router.push("/order/payment")}
          >
            <View style={styles.buttonContent}>
              <ShoppingBag color="white" size={18} />
              <Text style={styles.buttonText}>Checkout</Text>
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
  headerTitleStyle: { color: "white" },
  headerStyle: {
    backgroundColor: "#f4891f",
  },
  headerTitleAlign: "center",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f4891f",
    gap: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
  },
  profileAddress: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.5)",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  cartItemsContainer: {
    marginTop: 8,
  },
  checkoutContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryContainer: {
    marginBottom: 8,
    gap: 8,
  },
  checkoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  checkoutButton: {
    marginTop: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});

export default RootScreen;
