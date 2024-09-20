import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import BaseLayout from "../../layout/BaseLayout";
import { FormProvider } from "react-hook-form";
import InputField from "@/components/form/InputField";
import CheckboxField from "@/components/form/CheckboxField";
import Button from "@/components/ui/Button";
import useLogin from "@/hooks/auth/useLogin";
import { LoginValue } from "@/interface/auth.interface";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import Input from "@/components/ui/Input";
import YStack from "@/components/stacks/YStack";

const RootScreen = () => {
  const router = useRouter();
  const { form, mutation } = useLogin();

  const onSubmit = (value: LoginValue) => {
    router.replace("/");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BaseLayout>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-4 flex-1  h-full  ">
            <View className=" flex-1 justify-center items-center">
              <YStack className="mb-12">
                <Text className="text-[40px] text-primary  font-bold  text-center">
                  J&B
                </Text>
                <Text className="text-[40px] text-primary  font-bold  text-center">
                  Food Delivery
                </Text>
              </YStack>
              <FormProvider {...form}>
                <InputField
                  keyboardType="email-address"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                />

                <InputField
                  secureTextEntry={true}
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                />

                <View className="my-4 flex-row justify-between items-center w-full">
                  <CheckboxField name="toc" label="Remember me" />
                  <Link href="/" push className="text-base text-link">
                    Forgot Password
                  </Link>
                </View>
              </FormProvider>
              <Button className="w-full" onPress={form.handleSubmit(onSubmit)}>
                <Text className="text-lg font-bold text-white">LOGIN</Text>
              </Button>
            </View>

            <Text className="text-base text-center p-4">
              Don't have an account ?{" "}
              <Link href="/auth/sign-up" className="text-link">
                Sign up
              </Link>
            </Text>
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
