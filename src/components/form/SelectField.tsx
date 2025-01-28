import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import Select, { SelectProps } from "../ui/Select";

interface Props extends Omit<SelectProps, "options"> {
  name: string;
  options: Array<{ label: string; value: string }>;
}

const SelectField: FC<Props> = ({
  className,
  placeholder,
  options,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View style={[styles.container]}>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            {...props}
            options={options}
            selectedValue={value}
            onValueChange={(itemValue: any) => {
              onChange(itemValue === "" ? null : itemValue);
            }}
            onBlur={onBlur}
            placeholder={placeholder}
            containerClass={errors[props.name] ? "error-border" : undefined}
          />
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
  errorBorder: {
    borderColor: "#ef4444",
    borderWidth: 1,
  },
  errorText: {
    color: "#ef4444",
  },
});

export default SelectField;
