import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/atoms/button/BackButton";

const LoadingScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Loading....",
          headerStyle: {
            backgroundColor: "#F4891f",
          },
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerLeft: () => <BackButton />,
        }}
      />
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    </>
  );
};

export default LoadingScreen;
