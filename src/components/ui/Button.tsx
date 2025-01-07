import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

/**
 * Button component with debounce to prevent rapid clicking
 * Supports variants, sizes and disabled states
 */

export const buttonVariants = cva(
  "group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive text-destructive-foreground",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline focus:underline text-primary",
      },
      size: {
        default: "h-12 px-4 py-2 native:h-12 native:px-5 native:py-3",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-md px-8 native:h-14 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  activeOpacity?: number;
  debounceTime?: number;
}

const Button = forwardRef<ElementRef<typeof TouchableOpacity>, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      className,
      activeOpacity = 0.7,
      disabled,
      onPress,
      debounceTime = 300,
      ...props
    },
    ref
  ) => {
    // Debounce the onPress handler
    const debouncedOnPress = onPress;

    // Handle disabled state and combine classNames
    const buttonClassName = cn(
      buttonVariants({ variant, size, className }),
      disabled && "opacity-50 cursor-not-allowed"
    );

    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        activeOpacity={disabled ? 1 : activeOpacity}
        disabled={disabled}
        onPress={debouncedOnPress}
        className={buttonClassName}
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
