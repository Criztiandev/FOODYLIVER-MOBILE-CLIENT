import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

/**
 * Add Debounce to avoid multi clicking at the same time to avoid spamming
 */

export const buttonVariants = cva(
  "group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive",
        outline:
          "border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground",
        secondary: "bg-secondary",
        ghost: "web:hover:bg-accent web:hover:text-accent-foreground",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline",
      },
      size: {
        default: "h-12 px-4 py-2 native:h-12 native:px-5 native:py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 native:h-14",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface Props
  extends ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  activeOpacity?: number;
}

const Button = forwardRef<ElementRef<typeof TouchableOpacity>, Props>(
  (
    {
      children,
      variant,
      size,
      className,
      activeOpacity = 0.7,
      disabled,
      ...props
    },
    ref
  ) => {
    // Handle disabled state separately from className
    const buttonClassName = cn(
      buttonVariants({ variant, size, className }),
      disabled && "opacity-50"
    );

    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        activeOpacity={activeOpacity}
        disabled={disabled}
        className={buttonClassName}
      >
        {children}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export default Button;
