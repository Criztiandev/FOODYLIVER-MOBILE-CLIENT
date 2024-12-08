import { Text, View } from "react-native";
import React, { FC, useMemo } from "react";
import XStack from "@/components/stacks/XStack";
import { ProductItem } from "@/interface/product.interface";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import useCartStore from "@/state/useCartStore";
import { ShoppingCart, Wallet } from "lucide-react-native";
import Toast from "react-native-toast-message";

interface Props extends ProductItem {
  quantity: number;
}

const ProductActions: FC<Props> = (props) => {
  const router = useRouter();
  const { id } = props;
  const { calculateSubtotal, items, addProduct, updateQuantity } =
    useCartStore();

  // Find existing cart item
  const cartItem = items.find((item) => item.id === props.id);

  // Get cart quantity
  const cartQuantity = useMemo(() => {
    return items.find((cartItem) => cartItem.id === props.id)?.quantity || 0;
  }, [items, id]);

  const disabledBtn = !props.is_available || cartQuantity >= 99;

  // Handle add to cart
  const handleAddToCart = () => {
    if (!cartItem) {
      // Add new product with selected quantity
      addProduct({ id, ...props }, props.quantity);
    } else {
      // Update existing product with new total quantity
      // Make sure not to exceed maximum quantity

      const newQuantity = Math.min(cartQuantity + props.quantity, 99);
      updateQuantity(id as any, newQuantity);
    }
    Toast.show({
      type: "info",
      text1: "Product Added to cart",
    });
  };

  // Handle checkout
  const handleProductCheckout = () => {
    if (!cartItem) {
      // If not in cart, add with selected quantity
      addProduct(props, props.quantity);
    } else if (cartQuantity !== props.quantity) {
      // Update cart quantity to match selected quantity
      updateQuantity(id as any, props.quantity);
    }
    router.push("/order/payment");
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
            {cartQuantity > 0 ? (
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
