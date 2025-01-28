import React, { FC, ReactNode } from "react";
import { SafeAreaView, StatusBar, View, StyleSheet } from "react-native";

interface Props {
  children?: ReactNode;
}

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F4891F" />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
});

export default BaseLayout;
