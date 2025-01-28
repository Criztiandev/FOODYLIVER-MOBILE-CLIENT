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
  const [credentials, setCredentials] = useState<User | null>(null);
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
        setCredentials(credentials as User);
      }
    })();
  }, []);

  const renderCheckoutItem = (
    icon: React.ReactNode,
    label: string,
    value: number
  ) => (
    <View style={styles.checkoutItem}>
      <View style={styles.checkoutItemLeft}>
        {icon}
        <Text style={styles.checkoutItemLabel}>{label}</Text>
      </View>
      <Text style={styles.checkoutItemValue}>₱{value.toFixed(2)}</Text>
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
        <View style={styles.profileHeader}>
          <Avatar
            size={64}
            source={require("@/assets/images/girl-user.png")}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {credentials?.name ?? "Yen Timmango"}
            </Text>
            <Text style={styles.profileAddress}>
              {credentials?.address ?? "Block 56, Lot 14, Villa Luisa North"}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.cartContent}>
            <CartSelectedProducts />
          </View>
        </ScrollView>

        <SafeAreaView style={styles.checkoutContainer}>
          <View style={styles.checkoutSummary}>
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
            <View style={styles.checkoutButtonContent}>
              <ShoppingBag color="white" size={18} />
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </View>
          </Button>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
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
    backgroundColor: "#f4891f",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    borderWidth: 2,
    borderColor: "white",
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
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 200,
  },
  cartContent: {
    marginTop: 8,
  },
  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  checkoutSummary: {
    gap: 8,
    marginBottom: 8,
  },
  checkoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkoutItemLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4b5563",
  },
  checkoutItemValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4b5563",
  },
  checkoutButton: {
    backgroundColor: "#f4891f",
    paddingVertical: 12,
  },
  checkoutButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});

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
