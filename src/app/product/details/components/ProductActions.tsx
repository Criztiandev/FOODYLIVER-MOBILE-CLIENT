import { Text, View } from "react-native";
import React, { FC, useCallback, useMemo } from "react";
import XStack from "@/components/stacks/XStack";
import { ProductItem } from "@/interface/product.interface";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { ShoppingCart, Wallet } from "lucide-react-native";
import Toast from "react-native-toast-message";

type Props = ProductItem;

const ProductActions: FC<Props> = (props) => {
  const router = useRouter();
  const { id } = props;
  const { calculateSubtotal, items, addProduct, updateQuantity } =
    useCartStore();

  const cartItem = useMemo(
    () => items.find((item) => item.id === id),
    [items, id]
  );

  const currentQuantity = cartItem?.quantity || 1;
  const disabledBtn =
    !props.is_available || currentQuantity <= 0 || currentQuantity >= 99;
  const subtotal = useMemo(
    () => calculateSubtotal(),
    [calculateSubtotal, items]
  );

  const handleAddToCart = useCallback(() => {
    if (disabledBtn || !props.is_available || currentQuantity <= 0) return;

    if (!cartItem) {
      addProduct(props, 1);
    } else {
      const newQuantity = Math.min(currentQuantity + 1, 99);
      if (id) {
        updateQuantity(id, newQuantity);
      }
    }

    Toast.show({
      type: "success",
      text1: "Added to cart",
      text2: `Quantity: ${!cartItem ? 1 : Math.min(currentQuantity + 1, 99)}`,
      visibilityTime: 1500,
      autoHide: true,
    });
  }, [cartItem, currentQuantity, props, id, disabledBtn]);

  const handleProductCheckout = useCallback(() => {
    if (disabledBtn || !props.is_available || currentQuantity <= 0) {
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
      addProduct(props, 1);
    }
    router.push("/cart/list");
  }, [cartItem, props, disabledBtn, currentQuantity]);

  return (
    <View className="w-full flex justify-center items-center px-2">
      <XStack className="space-x-4">
        <Button
          disabled={disabledBtn}
          className="bg-stone-400/30 border border-stone-400 flex-1 flex-row space-x-2"
          onPress={handleAddToCart}
          activeOpacity={0.7}
        >
          <ShoppingCart color="black" size={18} />
          <Text className="text-base text-black uppercase font-semibold">
            Add to cart
          </Text>
        </Button>

        <Button
          className="flex-1 bg-primary"
          disabled={disabledBtn}
          onPress={handleProductCheckout}
          activeOpacity={0.7}
        >
          <XStack className="items-center space-x-2">
            <Wallet color="white" size={18} />
            {currentQuantity > 1 ? (
              <Text className="text-white text-base">₱ {subtotal}</Text>
            ) : (
              <Text className="text-base text-white uppercase font-semibold">
                ₱ {props.price}
              </Text>
            )}
          </XStack>
        </Button>
      </XStack>
    </View>
  );
};

export default React.memo(ProductActions);
