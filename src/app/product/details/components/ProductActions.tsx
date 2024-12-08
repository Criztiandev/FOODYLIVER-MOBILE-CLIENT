import { Text, View } from "react-native";
import React, { FC } from "react";
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

  const cartItem = items.find((item) => item.id === id);
  const currentQuantity = cartItem?.quantity || 0;
  const disabledBtn = !props.is_available || currentQuantity >= 99;

  const handleAddToCart = () => {
    if (!cartItem) {
      addProduct(props, 1);
    } else {
      const newQuantity = Math.min(currentQuantity + 1, 99);
      updateQuantity(id as any, newQuantity);
    }

    Toast.show({
      type: "info",
      text1: "Product Added to cart",
    });
  };

  const handleProductCheckout = () => {
    if (!cartItem || cartItem.quantity <= 0) {
      addProduct(props, 1);
    }
    router.push("/cart/list");
  };

  return (
    <View className="w-full flex justify-center items-center px-2">
      <XStack className="space-x-4">
        <Button
          disabled={disabledBtn}
          className="bg-stone-400/30 border border-stone-400 flex-1 flex-row space-x-2"
          onPress={handleAddToCart}
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
        >
          <XStack className="items-center space-x-2">
            <Wallet color="white" size={18} />
            {currentQuantity > 0 ? (
              <Text className="text-white text-base">
                P {calculateSubtotal()}
              </Text>
            ) : (
              <Text className="text-base text-white uppercase font-semibold">
                Buy Now
              </Text>
            )}
          </XStack>
        </Button>
      </XStack>
    </View>
  );
};

export default ProductActions;
