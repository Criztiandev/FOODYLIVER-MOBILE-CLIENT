import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { PlusIcon, MinusIcon } from "lucide-react-native";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { ProductItem } from "@/interface/product.interface";

interface ProductQuantityProps {
  quantity?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const ProductQuantity = ({
  quantity = 0,
  onIncrement,
  onDecrement,
}: ProductQuantityProps) => {
  return (
    <YStack style={styles.container}>
      <Text style={styles.title}>Quantity</Text>
      <XStack style={styles.quantityContainer}>
        <Button
          size="icon"
          onPress={onDecrement}
          disabled={quantity <= 0}
          aria-label="Decrease quantity"
          style={styles.button}
        >
          <MinusIcon color={quantity <= 0 ? "#9CA3AF" : "#FFFFFF"} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          style={styles.quantityButton}
          aria-label={`Current quantity is ${quantity}`}
        >
          <Text style={styles.quantityText}>{quantity}</Text>
        </Button>

        <Button
          size="icon"
          onPress={onIncrement}
          disabled={quantity >= 99}
          aria-label="Increase quantity"
          style={styles.button}
        >
          <PlusIcon color={quantity >= 99 ? "#9CA3AF" : "#FFFFFF"} />
        </Button>
      </XStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButton: {
    width: 48,
    height: 40,
    backgroundColor: "rgba(231, 229, 228, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProductQuantity;
