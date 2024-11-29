import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";

const CartEmpty = () => {
  const router = useRouter();
  return (
    <YStack className="flex-1 justify-center items-center space-y-4 p-4">
      <Image
        className="w-full h-[200px]"
        source={require("@/assets/images/Girl-magnify.png")}
      />
      <YStack className="space-y-4 justify-center items-center">
        <Text className="text-3xl font-bold">Hungry ?</Text>
        <Text className="text-base underline">
          You have not added anything to your cart
        </Text>
        <Button className="px-8" onPress={() => router.push("/")}>
          <Text className="text-white font-semibold text-base">Browse</Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default CartEmpty;
