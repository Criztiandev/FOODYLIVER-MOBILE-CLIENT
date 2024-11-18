import React from "react";
import InputField from "@/components/form/InputField";

const PersonalInfoStep = () => {
  return (
    <>
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
    </>
  );
};

export default PersonalInfoStep;
