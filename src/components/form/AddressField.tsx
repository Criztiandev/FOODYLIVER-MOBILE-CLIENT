import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import Input, { InputProps, inputVariant } from "../ui/Input";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import Label from "../ui/Label";
import AddressSearch from "../atoms/search/AddressSearch";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

interface Props extends InputProps {
  name: string;
  label?: string;
  labelClassName?: string;
}

const AddressInputField: FC<Props> = ({
  className,
  label,
  labelClassName,
  ...props
}) => {
  const {
    getValues,
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext();

  const handleSelectAddress = (value: GooglePlaceDetail | null) => {
    if (value) {
      setValue(props.name, {
        formatted_address: value.formatted_address,
        coordinates: {
          lat: value.geometry.location.lat,
          lng: value.geometry.location.lng,
        },
      });

      clearErrors(props.name);
    } else {
      setValue(props.name, null);
    }
  };

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

            <AddressSearch onSelect={handleSelectAddress} />
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

export default AddressInputField;
