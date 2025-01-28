import useCartStore from "@/state/useCartStore";
import { useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const CartButton = () => {
  const { items } = useCartStore();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/cart/list")}
      style={styles.container}
    >
      {items.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{items.length}</Text>
        </View>
      )}
      <ShoppingCart color="white" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 4,
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -8,
    zIndex: 50,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default CartButton;
