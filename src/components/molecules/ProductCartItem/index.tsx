import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { CartItem } from "@/interface/cart.interface";
import useCartStore from "@/state/useCartStore";
import { Minus, Plus } from "lucide-react-native";
import React, { useCallback, useMemo } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ProductCartItem = (props: CartItem) => {
  const { id, name, price } = props;
  const { items, incrementQuantity, addProduct, removeProduct } =
    useCartStore();

  // Memoize cart item lookup
  const cartItem = useMemo(
    () => items.find((item) => item.id === id),
    [items, id]
  );

  const quantity = cartItem?.quantity ?? 0;

  // Memoize handlers to prevent recreating on each render
  const handleIncrementQuantity = useCallback(() => {
    if (!id) return;

    if (!cartItem) {
      addProduct({ id, ...props }, 1);
    } else {
      incrementQuantity(id);
    }
  }, [id, cartItem, addProduct, incrementQuantity, props]);

  const handleDecrementQuantity = useCallback(() => {
    if (!id || quantity <= 0) return;
    removeProduct(id, 0);
  }, [id, quantity, removeProduct]);

  return (
    <YStack style={styles.container}>
      <XStack style={styles.mainContent}>
        <XStack style={styles.productInfo}>
          <Avatar
            source={{
              uri: `https://jandbfoodapp.site/storage/${props.thumbnail}`,
            }}
            size={64}
          />

          <YStack>
            <Text style={styles.productName}>{name || "Products"}</Text>

            <XStack style={styles.priceContainer}>
              <XStack style={styles.priceWrapper}>
                <Text style={styles.currencySymbol}>₱</Text>
                <Text style={styles.price}>{price}</Text>
              </XStack>
            </XStack>
          </YStack>
        </XStack>

        <XStack style={styles.quantityControls}>
          <Button
            size="icon"
            variant="ghost"
            onPress={handleIncrementQuantity}
            style={styles.quantityButton}
          >
            <Plus color="#F4891F" size={20} />
          </Button>

          <Button size="icon" variant="ghost" style={styles.quantityDisplay}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onPress={handleDecrementQuantity}
            style={styles.quantityButton}
            disabled={quantity <= 0}
          >
            <Minus color="#F4891F" size={20} />
          </Button>
        </XStack>
      </XStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 16,
  },
  mainContent: {
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  productInfo: {
    gap: 16,
  },
  productName: {
    fontSize: 24, // Increased from 18
    fontWeight: "700", // Made bolder
    maxWidth: 200,
    textTransform: "capitalize",
  },
  priceContainer: {
    gap: 16,
    alignItems: "center",
  },
  priceWrapper: {
    alignItems: "center",
    gap: 4,
  },
  currencySymbol: {
    color: "#F4891F",
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F4891F",
  },
  quantityControls: {
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF3E7",
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    height: 36,
    width: 36,
  },
  quantityDisplay: {
    backgroundColor: "transparent",
    height: 36,
    width: 36,
  },
  quantityText: {
    fontSize: 20, // Increased from 18
    fontWeight: "700",
    color: "#000000", // Changed from #F4891F to black
  },
});

export default ProductCartItem;
