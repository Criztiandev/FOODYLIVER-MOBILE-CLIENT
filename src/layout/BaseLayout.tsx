import { cn } from "@/lib/utils";
import React, { FC, ReactNode, Suspense } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Platform,
  KeyboardAvoidingView,
  ViewProps,
  Text,
  ScrollView,
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
        <ScrollView style={{ flexGrow: 1 }}>{children}</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BaseLayout;
