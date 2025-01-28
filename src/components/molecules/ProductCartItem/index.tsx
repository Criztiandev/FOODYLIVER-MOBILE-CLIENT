import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { CartItem } from "@/interface/cart.interface";
import useCartStore from "@/state/useCartStore";
import { Minus, Plus } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ProductCartItem = (props: CartItem) => {
  const { id, name, price } = props;
  const { items, incrementQuantity, addProduct, removeProduct } =
    useCartStore();
  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem?.quantity ?? 0;

  const handleIncrementQuantity = () => {
    if (!id) return;

    if (!cartItem) {
      addProduct({ id, ...props }, 1);
    } else {
      incrementQuantity(id);
    }
  };

  const handleDecrementQuantity = () => {
    if (!id) return;
    if (quantity > 0) {
      removeProduct(id, 0);
    }
  };

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
          <TouchableOpacity onPress={handleIncrementQuantity}>
            <Plus color="#F4891F" />
          </TouchableOpacity>

          <Button size="icon" variant="ghost">
            <Text style={styles.quantityText}>{quantity}</Text>
          </Button>

          <TouchableOpacity onPress={handleDecrementQuantity}>
            <Minus color="#F4891F" />
          </TouchableOpacity>
        </XStack>
      </XStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(243, 244, 246, 0.3)", // bg-primary/30
    padding: 16, // p-4
    borderRadius: 6, // rounded-md
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // mb-2
    gap: 16, // space-y-4
  },
  mainContent: {
    gap: 16, // space-x-4
    justifyContent: "space-between",
    alignItems: "center",
  },
  productInfo: {
    gap: 16, // space-x-4
  },
  productName: {
    fontSize: 18, // text-lg
    fontWeight: "600", // font-semibold
    maxWidth: 200, // max-w-[200px]
    textTransform: "capitalize",
  },
  priceContainer: {
    gap: 16, // space-x-4
    alignItems: "center",
  },
  priceWrapper: {
    alignItems: "center",
    gap: 4, // space-x-1
  },
  currencySymbol: {
    color: "#78716c", // text-stone-500
  },
  price: {
    fontSize: 14, // text-sm
    fontWeight: "600", // font-semibold
    color: "#78716c", // text-stone-500
    textDecorationLine: "underline",
  },
  quantityControls: {
    alignItems: "center",
    gap: 8, // spacex-2
  },
  quantityText: {
    fontSize: 18, // text-lg
    fontWeight: "700", // font-bold
  },
});

export default ProductCartItem;
