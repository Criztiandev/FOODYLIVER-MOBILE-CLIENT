import React from "react";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";

const PersonalInfoStep = () => {
  return (
    <>
      <InputField
        label="First name"
        name="firstName"
        placeholder="Enter your First name"
      />

      <InputField
        label="Middle name"
        name="middleName"
        placeholder="Enter your Middle name"
      />

      <InputField
        label="Last name"
        name="lastName"
        placeholder="Enter your Last name"
      />

      <SelectField
        label="Suffix"
        name="suffix"
        placeholder="Select Suffix"
        options={[{ label: "Jr", value: "jr" }]}
      />
    </>
  );
};

export default PersonalInfoStep;
