import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface Props extends Categories {}

const CategoriesCard = ({ id, name }: Props) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{ flexShrink: 1 }}
      onPress={() => router.push(`/product/list/${name}`)}
      className="h-[100px] w-[200px] mr-2"
    >
      <ImageBackground
        resizeMode="cover"
        source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
        className=" rounded-md  overflow-hidden"
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-white text-lg font-bold ">{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
