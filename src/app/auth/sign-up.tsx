import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Link, Stack } from "expo-router";
import { FormProvider } from "react-hook-form";
import BaseLayout from "../../layout/BaseLayout";
import Button from "@/components/ui/Button";
import useRegister from "../../hooks/auth/useRegister";
import PersonalInfoStep from "./partials/steps/PersonalInfoStep";
import AccountInfoStep from "./partials/steps/AccountInfoStep";
import AddressInfoStep from "./partials/steps/AddressStep";
import {
  AccountInfoStepValidation,
  AddressInfoValidation,
  PersonalInfoStepValidation,
} from "@/service/validation/auth.validation";

// Utility functions (can be moved to separate file)
const cleanAddress = (formattedAddress: string): string => {
  const cleaned = formattedAddress
    .replace(/\bBlk\.?\s*\d*\s*|\bLot\s*\d*\s*/gi, "")
    .trim();
  return cleaned.replace(/\s+/g, " ");
};

const extractCity = (formattedAddress: string): string | null => {
  const cleaned = formattedAddress
    .replace(/\bBlk\.?\s*\d*\s*|\bLot\s*\d*\s*/gi, "")
    .trim();
  const addressParts = cleaned.split(",");
  return addressParts.length >= 2 ? addressParts[1].trim() : null;
};

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
      {
        component: <AccountInfoStep />,
        validation: AccountInfoStepValidation,
      },
    ],
  });

  const { element, isFistStep, isLastStep, nextStep, prevStep } = multiform;

  const onSubmit = () => {
    if (!isLastStep) {
      nextStep();
      return;
    }

    // Get form values
    const payload = form.getValues();

    // Extract name components
    const fullName = `${payload.first_name} ${payload.last_name}`;

    // Extract address components
    const { formatted_address, coordinates } = payload.address;
    const block = payload.blk ? `Blk. ${payload.blk}` : "";
    const lot = payload.lot ? `Lot ${payload.lot}` : "";
    const currentAddress = cleanAddress(formatted_address);
    const barangay = payload.barangay ? `Brgy ${payload.barangay}` : "";
    const city = extractCity(formatted_address);
    const postalCode = payload.postal_code;

    // Build complete address string
    const address = `${block} ${lot} ${barangay} ${currentAddress} ${postalCode}`;

    // Clean up payload
    delete payload.blk;
    delete payload.lot;

    const requestPayload = {
      ...payload,
      name: fullName,
      address,
      city,
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
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.keyboardView}
          >
            {/* Main Content */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.mainContent}>
                <Text style={styles.title}>Sign Up Your Account</Text>

                <FormProvider {...form}>{element}</FormProvider>
              </View>
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <Button
                style={styles.primaryButton}
                onPress={form.handleSubmit(onSubmit)}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>
                    {isLastStep ? "Sign up" : "Next"}
                  </Text>
                )}
              </Button>

              {!isFistStep && (
                <Button style={styles.secondaryButton} onPress={prevStep}>
                  <Text style={styles.backButtonText}>Back</Text>
                </Button>
              )}

              {isFistStep && (
                <Text style={styles.footerText}>
                  Already have an account?{" "}
                  <Link href="/auth/sign-in" style={styles.link}>
                    Sign in
                  </Link>
                </Text>
              )}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    marginTop: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  bottomSection: {
    padding: 16,
    backgroundColor: "white",
    // Optional: Add shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  primaryButton: {
    width: "100%",
    marginBottom: 12,
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  link: {
    color: "#3b82f6", // blue-500
  },
});

export default RootScreen;
