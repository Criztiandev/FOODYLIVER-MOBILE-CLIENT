import { Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ImageBackground } from "react-native";

const PromotionalCard = (props: any) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{ flexShrink: 1, width: Dimensions.get("screen").width - 16 }}
      onPress={() => router.push(`/product/list/${props.name}`)}
      className="h-[200px]  mr-2"
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
        <Text className="text-white text-lg font-bold ">{props.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PromotionalCard;
