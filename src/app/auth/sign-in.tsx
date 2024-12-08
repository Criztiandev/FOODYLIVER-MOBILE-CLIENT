import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
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

// Separate Logo component for better organization
const Logo = () => (
  <YStack style={styles.logoContainer}>
    <Text style={[styles.logoText, styles.boldPoppins]}>J&B</Text>
    <Text style={styles.logoText}>Food Delivery</Text>
  </YStack>
);

// Separate LoginForm component
const LoginForm = ({ form, mutation }: any) => (
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
    <View style={styles.rememberContainer}>
      <CheckboxField name="toc" label="Remember me" />
      <Link href="/" push style={styles.linkText}>
        Forgot Password
      </Link>
    </View>
  </FormProvider>
);

// Separate LoginButton component
const LoginButton = ({ onPress, isPending }: any) => (
  <Button disabled={isPending} style={styles.button} onPress={onPress}>
    {isPending ? (
      <ActivityIndicator />
    ) : (
      <Text style={[styles.buttonText, styles.boldPoppins]}>Login</Text>
    )}
  </Button>
);

const RootScreen = () => {
  const router = useRouter();
  const { form, mutation } = useLogin();
  const { isLoading, showSplash, handleSplash } = useSplashScreen();

  if (isLoading) return <LoadingScreen />;
  if (showSplash) return <SplashScreen setSplash={handleSplash} />;

  const onSubmit = (value: LoginValue) => {
    mutation.mutate(value);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Logo />
          <LoginForm form={form} mutation={mutation} />
          <LoginButton
            onPress={form.handleSubmit(onSubmit)}
            isPending={mutation.isPending}
          />
        </View>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Link href="/auth/sign-up" style={styles.linkText}>
            Sign up
          </Link>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 48,
  },
  logoText: {
    fontSize: 42,
    color: "#F4891F",
    fontWeight: "bold",
    textAlign: "center",
  },
  boldPoppins: {
    fontFamily: "Poppins-Bold",
  },
  rememberContainer: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    padding: 16,
  },
  linkText: {
    color: "#link", // Replace with your actual link color
    fontSize: 16,
  },
});

export default RootScreen;
