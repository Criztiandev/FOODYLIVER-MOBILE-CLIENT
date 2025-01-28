import { KeyboardTypeOptions, TextInput, StyleSheet } from "react-native";
import React, { ComponentPropsWithoutRef } from "react";

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 16,
  },
  default: {
    borderColor: "#d6d3d1", // stone-300
  },
});

interface Props extends ComponentPropsWithoutRef<typeof TextInput> {
  type?: KeyboardTypeOptions;
  placeholderTextColor?: string;
  variant?: "default";
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, Props>(
  ({ variant = "default", placeholderTextColor, style, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.base, styles[variant], style]}
        placeholderTextColor={placeholderTextColor ?? "#71717a"} // zinc-500 for muted text
        editable={props.editable}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export type InputProps = Props;
export default Input;
