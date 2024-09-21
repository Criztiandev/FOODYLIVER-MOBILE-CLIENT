import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import XStack from "@/components/stacks/XStack";

const ProductHeader = () => {
  const router = useRouter();
  return (
    <Stack.Screen
      options={{
        title: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <XStack>
            <TouchableOpacity>
              <Heart color="black" />
            </TouchableOpacity>
          </XStack>
        ),
      }}
    />
  );
};

export default ProductHeader;
