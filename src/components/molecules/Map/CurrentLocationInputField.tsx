import { View, Text } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import * as Location from "expo-location";
import Label from "@/components/ui/Label";
import InputField from "@/components/form/InputField";
import { InputProps } from "@/components/ui/Input";

interface LocationValue {
  formatted_address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface Props extends Omit<InputProps, "defaultValue"> {
  name: string;
  label?: string;
  labelClassName?: string;
  defaultValue?: LocationValue;
}

const CurrentLocationInputField: FC<Props> = ({
  className,
  label,
  labelClassName,
  defaultValue,
  ...props
}) => {
  const {
    getValues,
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext();

  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setLocationError(null);

      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationError("Permission to access location was denied");
        return;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Get address from coordinates (reverse geocoding)
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const formattedAddress = [
          address.street,
          address.streetNumber,
          address.district,
          address.city,
          address.region,
          address.postalCode,
          address.country,
        ]
          .filter(Boolean)
          .join(", ");

        const locationValue = {
          formatted_address: formattedAddress,
          coordinates: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        };

        setValue(props.name, locationValue);
        clearErrors(props.name);
      }
    } catch (error) {
      console.error("Location error:", error);
      setLocationError("Error getting location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(props.name, defaultValue);
    } else {
      getCurrentLocation();
    }
  }, [defaultValue, props.name, setValue]);

  const currentValue = getValues(props.name);

  return (
    <View className={cn("mb-4 w-full", className)}>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: true }}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <View>
            {label && (
              <Label className={cn("mb-2 font-semibold", labelClassName)}>
                {label}
              </Label>
            )}

            <InputField
              {...props}
              value={currentValue?.formatted_address || ""}
              editable={false}
              placeholder={
                isLoading
                  ? "Getting current location..."
                  : currentValue?.formatted_address || ""
              }
              defaultValue={currentValue?.formatted_address || ""}
              style={{
                // color for placeholder
                color: isLoading ? "gray" : "black",
              }}
            />

            {locationError && (
              <Text className="text-error mt-1 text-sm">{locationError}</Text>
            )}
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

export default CurrentLocationInputField;
