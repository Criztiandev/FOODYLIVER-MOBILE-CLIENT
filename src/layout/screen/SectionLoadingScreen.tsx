import React from "react";
import { Text, View } from "react-native";

const SectionLoadingScreen = () => {
  return (
    <View className="h-[200px]">
      <View className=" h-full flex-1 justify-center items-center border border-stone-400 w-full rounded-md opcity-70 ">
        <Text className="font-semibold text-lg">Loading...</Text>
      </View>
    </View>
  );
};

export default SectionLoadingScreen;
