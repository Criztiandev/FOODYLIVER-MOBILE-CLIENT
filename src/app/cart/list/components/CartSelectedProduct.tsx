import ProductCartItem from "@/components/molecules/ProductCartItem";
import YStack from "@/components/stacks/YStack";
import useCartStore from "@/state/useCartStore";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View, StyleSheet } from "react-native";

const CartSelectedProducts = () => {
  const { items } = useCartStore();

  return (
    <YStack>
      <View style={styles.listContainer}>
        <FlashList
          data={items}
          estimatedItemSize={10000}
          renderItem={({ item }) => <ProductCartItem {...item} />}
        />
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    minHeight: 200,
  },
});

export default CartSelectedProducts;
