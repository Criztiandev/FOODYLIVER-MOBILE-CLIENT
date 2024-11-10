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
          title: "Link Gcash",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
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
              label="Last name"
              name="lastName"
              placeholder="Enter your Last name"
            />

            <InputField
              label="Phone Number"
              name="phoneNumber"
              placeholder="Enter your phone number"
            />
            <Button>
              <Text className="text-lg font-semibold text-white">Link</Text>
            </Button>
          </YStack>
        </FormProvider>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
