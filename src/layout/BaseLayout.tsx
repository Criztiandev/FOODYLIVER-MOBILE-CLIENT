import React, { FC, ReactNode } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

interface Props {
  children?: ReactNode;
  className?: string;
}

const BaseLayout: FC<Props> = ({ children, ...props }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#F4891F" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1">{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BaseLayout;
