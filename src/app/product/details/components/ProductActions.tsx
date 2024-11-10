import { Text } from "react-native";
import React, { FC, useMemo, useState } from "react";
import XStack from "@/components/stacks/XStack";
import { ProductItem } from "@/interface/product.interface";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import YStack from "@/components/stacks/YStack";
import useCartStore from "@/state/useCartStore";
import Toast from "react-native-toast-message";
import { ShoppingCart, Wallet } from "lucide-react-native";

interface Props extends ProductItem {}

const ProductActions: FC<Props> = (props) => {
  const router = useRouter();
  const { calculateSubtotal, items } = useCartStore();
  const quantity = useMemo(() => {
    return items.find((cardItem) => cardItem.id === props.id)?.quantity;
  }, [items]);

  const disabledBtn = !props.is_available || (quantity && quantity >= 99);

  const handleAddToCart = () => {
    if (quantity === undefined || (quantity && quantity <= 0)) {
      Toast.show({
        type: "info",
        text1: "Invalid Action, Add Quantity before proceeding",
      });
      return;
    }

    router.push("/cart/list");
  };

  return (
    <XStack className="space-x-4 my-4">
      <Button
        disabled={disabledBtn || false}
        className="bg-stone-400/30 border border-stone-400 flex-1 flex-row space-x-2"
        onPress={handleAddToCart}
      >
        <ShoppingCart color="black" size={18} />
        <Text className="text-base text-black uppercase font-semibold">
          Add to cart
        </Text>
      </Button>

      <Button className="flex-1 bg-primary" disabled={disabledBtn || false}>
        <XStack className="items-center space-x-2">
          <Wallet color="white" size={18} />
          {quantity && quantity > 0 ? (
            <Text className="text-white text-base ">
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
  );
};

export default ProductActions;
