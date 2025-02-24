import { router, Stack } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import { Coins, ShoppingBag, Wallet } from "lucide-react-native";

import BackButton from "@/components/atoms/button/BackButton";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import CartEmpty from "./components/CartEmpty";
import CartSelectedProducts from "./components/CartSelectedProduct";
import useCartStore from "@/state/useCartStore";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import { User } from "@/interface/user.interface";

// Separate components for better organization
const ProfileHeader: React.FC<{ user: User | null }> = ({ user }) => (
  <View style={styles.profileHeader}>
    <Avatar
      size={64}
      source={require("@/assets/images/girl-user.png")}
      style={styles.avatar}
    />
    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>{user?.name ?? "Yen Timmango"}</Text>
      <Text style={styles.profileAddress}>
        {user?.address ?? "Block 56, Lot 14, Villa Luisa North"}
      </Text>
    </View>
  </View>
);

const CheckoutItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
}> = ({ icon, label, value }) => (
  <View style={styles.checkoutItem}>
    <View style={styles.checkoutItemLeft}>
      {icon}
      <Text style={styles.checkoutItemLabel}>{label}</Text>
    </View>
    <Text style={styles.checkoutItemValue}>₱{value.toFixed(2)}</Text>
  </View>
);

const CheckoutButton: React.FC = () => (
  <Button
    style={styles.checkoutButton}
    onPress={() => router.push("/order/payment")}
  >
    <View style={styles.checkoutButtonContent}>
      <ShoppingBag color="white" size={18} />
      <Text style={styles.checkoutButtonText}>Checkout</Text>
    </View>
  </Button>
);

const stackScreenOptions = {
  headerLeft: () => <BackButton />,
  title: "My Cart",
  headerTitleStyle: { color: "white", fontSize: 18, fontWeight: "600" },
  headerStyle: {
    backgroundColor: "#f4891f",
  },
  headerTitleAlign: "center",
} as const;

const CartScreen: React.FC = () => {
  const { items, calculateSubtotal } = useCartStore();
  const { getItem } = useLocalStorage();

  // Use hooks for state management
  const [user, setUser] = React.useState<User | null>(null);

  // Memoize calculated values
  const { subtotal, total } = useMemo(() => {
    const currentSubtotal = calculateSubtotal();
    return {
      subtotal: currentSubtotal,
      total: currentSubtotal, // Add delivery fee or other charges here if needed
    };
  }, [items, calculateSubtotal]);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getItem("user");
        if (userData) {
          setUser(userData as User);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [getItem]);

  // Empty cart view
  if (!items?.length) {
    return (
      <>
        <Stack.Screen options={stackScreenOptions} />
        <CartEmpty />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={stackScreenOptions} />

      <SafeAreaView style={styles.safeArea}>
        <ProfileHeader user={user} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cartContent}>
            <CartSelectedProducts />
          </View>
        </ScrollView>

        <SafeAreaView style={styles.checkoutContainer}>
          <View style={styles.checkoutSummary}>
            <CheckoutItem
              icon={<Coins color="black" size={18} />}
              label="Sub Total"
              value={subtotal}
            />
            <CheckoutItem
              icon={<Wallet color="black" size={18} />}
              label="Total"
              value={total}
            />
          </View>

          <CheckoutButton />
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

export default CartScreen;
