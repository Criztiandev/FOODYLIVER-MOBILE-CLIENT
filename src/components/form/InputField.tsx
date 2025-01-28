import { View, Text, StyleSheet, TextStyle } from "react-native";
import React, { FC } from "react";
import Input, { InputProps } from "../ui/Input";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import Label from "../ui/Label";

interface Props extends Omit<InputProps, "style"> {
  name: string;
  label?: string;
  labelClassName?: TextStyle | TextStyle[];
  style?: TextStyle | TextStyle[];
}

const InputField: FC<Props> = ({ style, label, labelClassName, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View style={[styles.container, style]}>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View>
            {label && (
              <Label style={[styles.label, labelClassName]}>{label}</Label>
            )}
            <Input
              {...props}
              onChangeText={onChange}
              value={value}
              style={[styles.input]}
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
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  errorText: {
    color: "#dc2626", // Typical error red color
    marginTop: 4,
    fontSize: 12,
  },
});

export default InputField;
