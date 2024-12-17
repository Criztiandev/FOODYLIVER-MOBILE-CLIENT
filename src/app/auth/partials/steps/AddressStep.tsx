import React, { useState } from "react";
import InputField from "@/components/form/InputField";
import { View } from "react-native";
import AddressInputField from "@/components/form/AddressField";
import XStack from "@/components/stacks/XStack";

const AddressInfoStep = () => {
  return (
    <>
      <XStack className="space-x-4">
        <View className="flex-1">
          <InputField label="Blk" name="blk" placeholder="Enter your Block " />
        </View>

        <View className="flex-1">
          <InputField label="Lot" name="lot" placeholder="Enter your Lot " />
        </View>
      </XStack>

      <InputField
        label="Building"
        name="building"
        placeholder="Enter your Building "
      />

      <AddressInputField label="Address" name="address" />

      <InputField
        label="Postal code"
        name="postal_code"
        placeholder="Enter your Post code"
      />
    </>
  );
};

export default AddressInfoStep;
