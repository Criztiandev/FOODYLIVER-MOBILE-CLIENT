import { View, ViewProps, StyleSheet } from "react-native";
import { FC } from "react";

interface Props extends ViewProps {
  style?: any;
}

const XStack: FC<Props> = ({ children, style, ...props }) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default XStack;
