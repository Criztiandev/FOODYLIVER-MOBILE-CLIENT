import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const CategoriesCard = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{ flexShrink: 1 }}
      onPress={() => router.push("/product/list/test")}
      className="h-[100px] w-[200px] mr-2"
    >
      <ImageBackground
        resizeMode="cover"
        source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
        className="w-full rounded-md justify-center items-center overflow-hidden h-full"
      />
      <Text className="text-white text-lg">Food</Text>
      <ImageBackground />
    </TouchableOpacity>
  );
};

export default CategoriesCard;
