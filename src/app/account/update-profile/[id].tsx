import BackButton from "@/components/atoms/button/BackButton";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import { Stack } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text } from "react-native";

const RootScreen = () => {
  const form = useForm();
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Account Details",
        }}
      />

      <BaseLayout>
        <FormProvider {...form}>
          <YStack className="px-4 py-2">
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

            <InputField
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <InputField
              label="Password"
              name="password"
              placeholder="Enter your password"
            />

            <Button>
              <Text className="text-lg font-semibold text-white">Update</Text>
            </Button>
          </YStack>
        </FormProvider>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
