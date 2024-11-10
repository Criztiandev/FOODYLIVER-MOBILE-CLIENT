import { Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const PromotionalCard = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/product/list/promotional")}
      style={{
        width: Dimensions.get("screen").width - 16,
      }}
      className=" h-[200px] border rounded-md p-4 flex justify-center items-center mr-2"
    >
      <Text className="text-lg font-bold">Fast Food</Text>
    </TouchableOpacity>
  );
};

export default PromotionalCard;
