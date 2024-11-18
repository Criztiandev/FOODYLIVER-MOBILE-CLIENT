import React from "react";
import { Link, Stack } from "expo-router";
import BaseLayout from "../../layout/BaseLayout";
import { ScrollView, Text, View } from "react-native";
import Button from "@/components/ui/Button";
import { FormProvider } from "react-hook-form";
import useRegister from "../../hooks/auth/useRegister";
import PersonalInfoStep from "./partials/steps/PersonalInfoStep";

import AccountInfoStep from "./partials/steps/AccountInfoStep";
import {
  AccountInfoStepValidation,
  AddressInfoValidation,
  PersonalInfoStepValidation,
} from "@/service/validation/auth.validation";
import AddressInfoStep from "./partials/steps/AddressStep";

const RootScreen = () => {
  const { multiform, form, mutation } = useRegister({
    defaultValues: {},
    steps: [
      {
        component: <PersonalInfoStep />,
        validation: PersonalInfoStepValidation,
      },
      {
        component: <AddressInfoStep />,
        validation: AddressInfoValidation,
      },
      { component: <AccountInfoStep />, validation: AccountInfoStepValidation },
    ],
  });

  const { element, isFistStep, isLastStep, nextStep, prevStep, currentStep } =
    multiform;

  const onSubmit = () => {
    if (!isLastStep) {
      nextStep();
      return;
    }
    const payload = form.getValues();

    const fullName = `${payload.first_name} ${payload.last_name}`;

    // format addess
    const { formatted_address, coordinates } = payload.address;

    const block = `Blk. ${payload.blk}`;
    const lot = `Lot ${payload.lot}`;
    const currentAddress = cleanAddress(formatted_address);
    const city = extractCity(formatted_address);
    const postalCode = payload.postal_code;

    const address = `${block} ${lot} ${currentAddress} ${postalCode}`;

    delete payload.blk;
    delete payload.lot;

    const requestPayload = {
      ...payload,
      name: fullName,
      address: address,
      city: city,
      longitude: coordinates.lng,
      latitude: coordinates.lat,
      vehicle_type: "N/A",
      license_plate: "N/A",
      role: "Customer",
      is_active: true,
    };

    mutation.mutate(requestPayload);
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BaseLayout>
        <View className="flex-1 p-2 justify-center  border">
          <View className=" flex-1 justify-center items-center">
            <Text className="text-[32px] mb-12 text-center font-bold">
              Sign Up Your Account
            </Text>

            <FormProvider {...form}>{element}</FormProvider>
          </View>

          <View>
            <Button
              className="w-full mb-3"
              onPress={form.handleSubmit(onSubmit)}
            >
              <Text className="text-white font-semibold">
                {isLastStep ? "Sign up" : "Next"}
              </Text>
            </Button>

            {!isFistStep && (
              <Button
                className="w-full bg-white border border-[#ccc] "
                onPress={prevStep}
              >
                <Text className="text-base font-semibold">Back</Text>
              </Button>
            )}
          </View>

          {isFistStep && (
            <Text className="text-base text-center p-4 ">
              Already have an account ?{" "}
              <Link href="/auth/sign-in" className="text-blue-500">
                Sign in
              </Link>
            </Text>
          )}
        </View>
      </BaseLayout>
    </>
  );
};

export default RootScreen;

function cleanAddress(formattedAddress: string): string {
  // Use a regular expression to remove 'Blk' and 'Lot' along with their respective numbers
  const cleanedAddress = formattedAddress
    .replace(/\bBlk\.?\s*\d*\s*|\bLot\s*\d*\s*/gi, "")
    .trim();

  // Replace multiple spaces with a single space
  return cleanedAddress.replace(/\s+/g, " ");
}

function extractCity(formattedAddress: string): string | null {
  const cleanedAddress = formattedAddress
    .replace(/\bBlk\.?\s*\d*\s*|\bLot\s*\d*\s*/gi, "")
    .trim();

  const addressParts = cleanedAddress.split(",");

  if (addressParts.length >= 2) {
    return addressParts[1].trim();
  }

  return null;
}
