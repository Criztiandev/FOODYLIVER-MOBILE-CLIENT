import BackButton from "@/components/atoms/button/BackButton";
import BaseLayout from "@/layout/BaseLayout";
import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

const RootScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Notification",
        }}
      />

      <BaseLayout>
        <Text>Layout</Text>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
