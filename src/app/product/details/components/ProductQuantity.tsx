import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import { Text } from "react-native";
import { PlusIcon, MinusIcon } from "lucide-react-native";
import XStack from "@/components/stacks/XStack";
import useProductStore from "@/state/useProductStore";
import useCartStore from "@/state/useCartStore";
import { ProductItem } from "@/interface/product.interface";
interface Props extends ProductItem {}

const ProductQuantity: FC<Props> = (props) => {
  const { id } = props;
  const { addProduct, removeProduct, incrementQuantity, items } =
    useCartStore();
  const cartItem = items.find((item) => item.id === props.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrementQuantity = () => {
    if (!cartItem) {
      addProduct({ id, ...props }, 1);
    } else {
      incrementQuantity(id || "");
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 0) {
      removeProduct(id || "", 0);
    }
  };

  return (
    <YStack className="justify-end items-start">
      <Text className="text-lg font-semibold mb-2">Quantity</Text>
      <XStack className="space-x-4 items-cemter">
        <Button size="icon" onPress={handleIncrementQuantity}>
          <PlusIcon color="white" />
        </Button>

        <Button size="icon" variant="outline" className="bg-stone-200">
          <Text>{quantity || 0}</Text>
        </Button>

        <Button size="icon" onPress={handleDecrementQuantity}>
          <MinusIcon color="white" />
        </Button>
      </XStack>
    </YStack>
  );
};

export default ProductQuantity;
