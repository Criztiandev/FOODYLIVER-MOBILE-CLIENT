import {
  View,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import XStack from "@/components/stacks/XStack";
import { ShoppingCart } from "lucide-react-native";
import { Href, useRouter } from "expo-router";
import Avatar from "@/components/ui/Avatar";
import YStack from "@/components/stacks/YStack";
import { ProductItem } from "@/interface/product.interface";
import useCartStore from "@/state/useCartStore";

const ProductCard = (props: ProductItem) => {
  const router = useRouter();
  const { addProduct } = useCartStore();

  const handleAdd = () => {
    addProduct(props, 1);
  };

  return (
    <TouchableOpacity
      className="relative"
      onPress={() => router.navigate(`/product/details/${props.id}` as Href)}
    >
      <XStack className=" absolute top-1  w-full  p-2 px-3 justify-between items-center flex-1 z-[99px]">
        {props.rating && (
          <View className="p-2 bg-white rounded-full">
            <Text className="text-lg font-bold">{props?.rating}</Text>
          </View>
        )}
      </XStack>

      <View className="bg-primary/20 relative p-4 flex-2 flex-1   rounded-md m-1 justify-center items-center space-y-4">
        <View className="mt-6">
          <Avatar
            size={100}
            source={{
              uri: `https://jandbfoodapp.site/storage/${props.thumbnail}`,
            }}
          />
        </View>
        <XStack className="items-start justify-between w-full">
          <YStack>
            <Text className="font-bold text-xl capitalize">
              {props?.name?.length < 10
                ? props.name
                : `${props?.name?.substring(0, 10)}..`}
            </Text>
            <Text className="text-[16px] font-bold">₱ {props.price}</Text>
          </YStack>

          <TouchableOpacity onPress={handleAdd}>
            <ShoppingCart size={24} color="black" />
          </TouchableOpacity>
        </XStack>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
