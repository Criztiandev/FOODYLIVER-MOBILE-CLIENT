import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { Stack, useRouter } from "expo-router";
import { ChevronLeft, Heart, ShoppingCart } from "lucide-react-native";
import XStack from "@/components/stacks/XStack";
import BottomSheet from "@/components/ui/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import YStack from "@/components/stacks/YStack";
import CartButton from "@/components/atoms/CartButton";
import FavoriteButton from "@/components/atoms/FavoriteButton";
import BackButton from "@/components/atoms/BackButton";

const ProductHeader = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <XStack className="space-x-4">
              <FavoriteButton />
              <CartButton />
            </XStack>
          ),
        }}
      />
    </>
  );
};

export default ProductHeader;
