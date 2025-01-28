import { Text, View, StyleSheet } from "react-native";
import React, { FC, useCallback, useMemo } from "react";
import XStack from "@/components/stacks/XStack";
import { ProductItem } from "@/interface/product.interface";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { ShoppingCart, Wallet } from "lucide-react-native";
import Toast from "react-native-toast-message";

type Props = ProductItem & {
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
};

const ProductActions: FC<Props> = (props) => {
  const router = useRouter();
  const { id, quantity = 1, onQuantityChange } = props;
  const { items, addProduct, updateQuantity } = useCartStore();

  const cartItem = useMemo(
    () => items.find((item) => item.id === id),
    [items, id]
  );

  const productSubtotal = useMemo(
    () => quantity * props.price,
    [quantity, props.price]
  );

  const disabledBtn = !props.is_available || quantity < 1 || quantity > 99;

  const handleAddToCart = useCallback(() => {
    if (disabledBtn || !props.is_available) return;

    if (!cartItem) {
      addProduct(props, quantity);
      onQuantityChange?.(0);
    } else {
      const newQuantity = cartItem.quantity + quantity;
      if (id && newQuantity <= 99) {
        updateQuantity(id, newQuantity);
        onQuantityChange?.(0);
      }
    }

    Toast.show({
      type: "success",
      text1: "Added to cart",
      text2: `Quantity: ${quantity}`,
      visibilityTime: 1500,
      autoHide: true,
    });
  }, [cartItem, quantity, props, id, disabledBtn, onQuantityChange]);

  const handleProductCheckout = useCallback(() => {
    if (disabledBtn || !props.is_available || quantity <= 0) {
      Toast.show({
        type: "error",
        text1: "Invalid quantity",
        text2: "Please select a quantity greater than 0",
        visibilityTime: 1500,
        autoHide: true,
      });
      return;
    }

    if (!cartItem) {
      addProduct(props, quantity);
      onQuantityChange?.(0);
    } else {
      const newQuantity = cartItem.quantity + quantity;
      if (id && newQuantity <= 99) {
        updateQuantity(id, newQuantity);
        onQuantityChange?.(0);
      }
    }

    router.push("/cart/list");
  }, [cartItem, props, disabledBtn, quantity]);

  return (
    <View style={styles.container}>
      <XStack style={styles.buttonContainer}>
        <Button
          disabled={disabledBtn}
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.7}
        >
          <View style={styles.buttonContent}>
            <ShoppingCart color="black" size={18} />
            <Text style={styles.addToCartText}>Add to cart</Text>
          </View>
        </Button>

        <Button
          style={styles.checkoutButton}
          disabled={disabledBtn}
          onPress={handleProductCheckout}
          activeOpacity={0.7}
        >
          <View style={styles.buttonContent}>
            <Wallet color="white" size={18} />
            <Text style={styles.checkoutText}>₱ {productSubtotal}</Text>
          </View>
        </Button>
      </XStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  buttonContainer: {
    gap: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "rgba(214, 211, 209, 0.3)",
    borderWidth: 1,
    borderColor: "#a8a29e",
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: "#f4891f",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    color: "black",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  checkoutText: {
    fontSize: 16,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "600",
  },
});

export default React.memo(ProductActions);
