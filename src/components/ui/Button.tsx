import { TouchableOpacity, StyleSheet } from "react-native";
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  // Variants
  default: {
    backgroundColor: "#F4891F", // primary color from context
  },
  destructive: {
    backgroundColor: "#dc2626", // destructive color
  },
  outline: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  secondary: {
    backgroundColor: "#f3f4f6",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
    textDecorationLine: "underline",
    textDecorationColor: "#F4891F",
  },
  // Sizes
  sizeDefault: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sizeSm: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  sizeLg: {
    height: 56,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  sizeIcon: {
    height: 40,
    width: 40,
    padding: 0,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
});

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps
  extends ComponentPropsWithoutRef<typeof TouchableOpacity> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  activeOpacity?: number;
  debounceTime?: number;
}

const Button = forwardRef<ElementRef<typeof TouchableOpacity>, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "default",
      activeOpacity = 0.7,
      disabled,
      onPress,
      debounceTime = 300,
      style,
      ...props
    },
    ref
  ) => {
    // Debounce the onPress handler
    const debouncedOnPress = onPress;

    // Combine styles based on variant and size
    const buttonStyles = [
      styles.base,
      styles[variant],
      size === "default" && styles.sizeDefault,
      size === "sm" && styles.sizeSm,
      size === "lg" && styles.sizeLg,
      size === "icon" && styles.sizeIcon,
      disabled && styles.disabled,
      style, // Allow custom styles to override
    ];

    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        activeOpacity={disabled ? 1 : activeOpacity}
        disabled={disabled}
        onPress={debouncedOnPress}
        style={buttonStyles}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        {children}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export default Button;
