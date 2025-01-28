import { View, Text, StyleSheet } from "react-native";
import React, { FC, useEffect } from "react";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import Label from "../ui/Label";
import AddressSearch from "../atoms/search/AddressSearch";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

interface AddressValue {
  formatted_address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface Props {
  name: string;
  label?: string;
  labelClassName?: string;
  defaultValue?: AddressValue;
  className?: string;
}

const AddressInputField: FC<Props> = ({
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

  useEffect(() => {
    if (defaultValue) {
      setValue(props.name, defaultValue);
    }
  }, [defaultValue, props.name, setValue]);

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

  const currentValue = getValues(props.name);

  return (
    <View style={[styles.container]}>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: true }}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <View>
            {label && <Label style={[styles.label]}>{label}</Label>}

            <AddressSearch
              onSelect={handleSelectAddress}
              defaultValue={
                currentValue?.formatted_address ||
                defaultValue?.formatted_address
              }
            />
          </View>
        )}
      />
      {errors[props.name] && (
        <Text style={styles.errorText}>
          {(errors[props.name] as FieldError)?.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
  },
  errorText: {
    color: "#ef4444",
  },
});

export default AddressInputField;
