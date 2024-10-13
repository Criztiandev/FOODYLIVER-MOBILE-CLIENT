import { View, Text } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { FormProvider } from "react-hook-form";
import InputField from "@/components/form/InputField";
import CheckboxField from "@/components/form/CheckboxField";
import Button from "@/components/ui/Button";
import useLogin from "@/hooks/auth/useLogin";
import { LoginValue } from "@/interface/auth.interface";
import YStack from "@/components/stacks/YStack";
import SplashScreen from "@/layout/SplashScreen";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import useSplashScreen from "@/hooks/init/useSplashScreen";

const RootScreen = () => {
  const router = useRouter();
  const { form, mutation } = useLogin();
  const { isLoading, showSplash, handleSplash } = useSplashScreen();

  if (isLoading) return <LoadingScreen />;

  if (showSplash) {
    return <SplashScreen setSplash={handleSplash} />;
  }

  const onSubmit = (value: LoginValue) => {
    mutation.mutate(value);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="p-4 flex-1  h-full  justify-center " style={{ flex: 1 }}>
        <View className=" flex-1 justify-center items-center ">
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
          <Button
            disabled={mutation.isPending}
            className="w-full"
            onPress={form.handleSubmit(onSubmit)}
          >
            {mutation.isPending ? (
              <Text className="text-lg font-bold text-white">Login in</Text>
            ) : (
              <Text className="text-lg font-bold text-white">LOGIN</Text>
            )}
          </Button>
        </View>

        <Text className="text-base text-center p-4">
          Don't have an account ?{" "}
          <Link href="/auth/sign-up" className="text-link">
            Sign up
          </Link>
        </Text>
      </View>
    </>
  );
};

export default RootScreen;
