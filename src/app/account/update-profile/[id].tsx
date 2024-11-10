import BackButton from "@/components/atoms/button/BackButton";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import useFetchProfile from "@/hooks/account/useFetchProfile";
import BaseLayout from "@/layout/BaseLayout";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import NotFoundScreen from "@/layout/screen/NotFoundScreen";
import { Stack } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SafeAreaView, Text, View } from "react-native";

const RootScreen = () => {
  const { data, isLoading, isError } = useFetchProfile();
  const form = useForm();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <NotFoundScreen />;

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Update Profile",
          headerTitleStyle: {
            fontWeight: "600",
          },
          headerTitleAlign: "center",
        }}
      />

      <SafeAreaView className="bg-white flex-1 justify-between ">
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
          </YStack>
        </FormProvider>
        <View className="p-4">
          <Button>
            <Text className="text-lg font-semibold text-white">Update</Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RootScreen;
