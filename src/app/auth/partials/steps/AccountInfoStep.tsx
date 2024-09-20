import React, { useState } from "react";
import InputField from "@/components/form/InputField";
import { Eye } from "lucide-react-native";

const AccountInfoStep = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  return (
    <>
      <InputField label="Email" name="email" placeholder="Enter your email" />
      <InputField
        label="Password"
        name="password"
        placeholder="Enter your password"
      />
    </>
  );
};

export default AccountInfoStep;
