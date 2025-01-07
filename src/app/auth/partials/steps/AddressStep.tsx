import React, { useState } from "react";
import InputField from "@/components/form/InputField";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import AddressInputField from "@/components/form/AddressField";
import XStack from "@/components/stacks/XStack";
import CurrentLocationInputField from "@/components/molecules/Map/CurrentLocationInputField";
import Button from "@/components/ui/Button";
import { ChevronDown } from "lucide-react-native";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";

const AddressInfoStep = () => {
  const [isOptionalAddress, setIsOptionalAddress] = useState(true);
  return (
    <ScrollView
      className="flex-1 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <View className="h-[300px] rounded-md border-stone-300 w-full mb-4">
        <CurrentLocationMap />
      </View>
      <CurrentLocationInputField name="address" label="Complete Address" />

      <TouchableOpacity
        onPress={() => setIsOptionalAddress(!isOptionalAddress)}
      >
        <XStack className="mb-4 items-center justify-between w-full">
          <Text className="text-xl text-primary font-semibold">
            Address Details
          </Text>

          <ChevronDown size={24} color="black" />
        </XStack>
      </TouchableOpacity>

      {isOptionalAddress && (
        <View className="w-full">
          <XStack className="space-x-4">
            <View className="flex-1">
              <InputField
                label="House/Unit No."
                name="house_number"
                placeholder="Enter house/unit number"
              />
            </View>

            <View className="flex-1">
              <InputField
                label="Street"
                name="street"
                placeholder="Enter street name"
              />
            </View>
          </XStack>

          <InputField
            label="Barangay"
            name="barangay"
            placeholder="Enter barangay"
          />

          <InputField
            label="Postal code"
            name="postal_code"
            placeholder="Enter postal code"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default AddressInfoStep;
