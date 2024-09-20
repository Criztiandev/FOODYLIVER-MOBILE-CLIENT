import { TouchableOpacityProps, Pressable } from "react-native";
import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  forwardRef,
  PropsWithChildren,
} from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-90 active:opacity-90",
        destructive: "bg-destructive web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline ",
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
  extends ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<ElementRef<typeof Pressable>, Props>(
  ({ children, variant, size, className, ...props }, ref) => {
    return (
      <Pressable
        {...props}
        ref={ref}
        className={cn(
          `${props.disabled && "opacity-50"}`,
          buttonVariants({ variant, size, className })
        )}
      >
        {children}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export default Button;
