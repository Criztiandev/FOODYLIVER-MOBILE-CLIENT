import React from "react";
import InputField from "@/components/form/InputField";
import { View } from "react-native";

const PersonalInfoStep = () => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <InputField
        label="Username"
        name="username"
        placeholder="Enter your Username"
      />

      <InputField
        label="First name"
        name="first_name"
        placeholder="Enter your First name"
      />

      <InputField
        label="Last name"
        name="last_name"
        placeholder="Enter your Last name"
      />
    </View>
  );
};

export default PersonalInfoStep;
