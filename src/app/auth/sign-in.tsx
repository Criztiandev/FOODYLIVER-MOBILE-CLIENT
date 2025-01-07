import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { FormProvider } from "react-hook-form";
import InputField from "@/components/form/InputField";
import Button from "@/components/ui/Button";
import useLogin from "@/hooks/auth/useLogin";
import { LoginValue } from "@/interface/auth.interface";
import YStack from "@/components/stacks/YStack";
import SplashScreen from "@/layout/SplashScreen";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import useSplashScreen from "@/hooks/init/useSplashScreen";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
const Logo = () => (
  <YStack style={styles.logoContainer}>
    {/* <Image
      source={require("@/assets/images/delivery.png")}
      style={styles.logoImage}
      resizeMode="contain"
    /> */}
    <YStack className="items-center mt-4">
      <Text
        className="text-4xl font-bold text-primary"
        style={[styles.boldPoppins]}
      >
        J&B Food Delivery
      </Text>
      <Text
        className="text-base text-gray-600 mt-2"
        style={[styles.regularPoppins]}
      >
        Fast & Reliable Food Delivery
      </Text>
    </YStack>
  </YStack>
);

const LoginForm = ({ form }: { form: any }) => (
  <FormProvider {...form}>
    <View style={styles.formContainer}>
      <InputField
        keyboardType="email-address"
        label="Email"
        name="email"
        placeholder="Enter your email"
        autoCapitalize="none"
        autoComplete="email"
      />
      <InputField
        secureTextEntry
        label="Password"
        name="password"
        placeholder="Enter your password"
        autoCapitalize="none"
        autoComplete="password"
      />
    </View>
  </FormProvider>
);

const LoginButton = ({
  onPress,
  isPending,
}: {
  onPress: () => void;
  isPending: boolean;
}) => (
  <Button
    disabled={isPending}
    style={styles.button}
    onPress={onPress}
    accessibilityLabel="Login button"
  >
    {isPending ? (
      <ActivityIndicator color="#fff" size="small" />
    ) : (
      <Text style={[styles.buttonText, styles.boldPoppins]}>Login</Text>
    )}
  </Button>
);

const SignInScreen = () => {
  const { form, mutation } = useLogin();
  const { isLoading, showSplash, handleSplash } = useSplashScreen();

  if (isLoading) return <LoadingScreen />;
  if (showSplash) return <SplashScreen setSplash={handleSplash} />;

  const handleSubmit = (value: LoginValue) => {
    mutation.mutate(value);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Logo />
          <LoginForm form={form} />
          <LoginButton
            onPress={form.handleSubmit(handleSubmit)}
            isPending={mutation.isPending}
          />
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerText, styles.regularPoppins]}>
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              style={[styles.linkText, styles.boldPoppins]}
            >
              Sign up
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  formContainer: {
    width: "100%",
    marginBottom: 24,
  },
  logoContainer: {
    marginBottom: 48,
    alignItems: "center",
  },
  logoText: {
    fontSize: 48,
    color: "#F4891F",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoSubText: {
    fontSize: 24,
    color: "#F4891F",
    textAlign: "center",
  },
  boldPoppins: {
    fontFamily: "Poppins-Bold",
  },
  regularPoppins: {
    fontFamily: "Poppins-Regular",
  },
  button: {
    width: "100%",
    backgroundColor: "#F4891F",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  footer: {
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  linkText: {
    color: "#F4891F",
  },
});

export default SignInScreen;
