import { KeyboardTypeOptions, TextInput } from "react-native";
import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const inputVariant = cva(
  "border rounded-md h-12 w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm text-foreground placeholder:text-muted-foreground file:border-0 file:bg-transparent file:font-medium",
  {
    variants: {
      variant: {
        default: "border border-stone-300",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface Props
  extends ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariant> {
  type?: KeyboardTypeOptions;
  placeholderTextColor?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, Props>(
  ({ className, variant, placeholderTextColor, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={inputVariant({ variant, className })}
        placeholderTextColor={placeholderTextColor ?? "text-muted-foreground"}
        editable={props.editable}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export type InputProps = Props;
export default Input;
