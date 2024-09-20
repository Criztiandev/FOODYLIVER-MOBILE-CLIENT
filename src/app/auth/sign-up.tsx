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
  PersonalInfoStepValidation,
} from "@/service/validation/auth.validation";

const RootScreen = () => {
  const { multiform, form } = useRegister({
    defaultValues: {},
    steps: [
      {
        component: <PersonalInfoStep />,
        validation: PersonalInfoStepValidation,
      },
      { component: <AccountInfoStep />, validation: AccountInfoStepValidation },
    ],
  });

  const { element, isFistStep, isLastStep, nextStep, prevStep, currentStep } =
    multiform;

  const onSubmit = () => {
    if (!isLastStep) {
      nextStep();
    }

    const payload = form.getValues();
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BaseLayout>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-4 flex-1  ">
            <View className=" flex-1 justify-center items-center">
              <Text className="text-[32px] font-medium mb-12 text-center">
                Sign Up Your Account
              </Text>

              <FormProvider {...form}>{element}</FormProvider>

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
                  <Text className="text-lg text-white">Back</Text>
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
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
