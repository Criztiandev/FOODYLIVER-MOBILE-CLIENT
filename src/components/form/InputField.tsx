import { View, Text } from "react-native";
import React, { FC } from "react";
import Input, { InputProps } from "../ui/Input";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import Label from "../ui/Label";

interface Props extends InputProps {
  name: string;
  label?: string;
  labelClassName?: string;
}

const InputField: FC<Props> = ({
  className,
  label,
  labelClassName,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View className={cn("mb-4 w-full", className)}>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View>
            {label && (
              <Label className={cn("mb-2 font-semibold", labelClassName)}>
                {label}
              </Label>
            )}
            <Input {...props} onChangeText={onChange} value={value} />
          </View>
        )}
      />
      {errors[props.name] && (
        <Text className="text-error">
          {(errors[props.name] as FieldError)?.message}
        </Text>
      )}
    </View>
  );
};

export default InputField;
