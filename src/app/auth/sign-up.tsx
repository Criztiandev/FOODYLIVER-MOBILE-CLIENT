import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
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

// Utility functions
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

            <View style={styles.bottomSection}>
              <Button
                style={styles.primaryButton}
                onPress={form.handleSubmit(onSubmit)}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.buttonText}>
                    {isLastStep ? "Sign up" : "Next"}
                  </Text>
                )}
              </Button>

              {!isFistStep && (
                <Button
                  style={styles.secondaryButton}
                  onPress={prevStep}
                  variant="outline"
                >
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
    backgroundColor: "#FFFFFF",
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
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    marginTop: 24,
    textAlign: "center",
    fontWeight: "700",
    color: "#1F2937",
  },
  bottomSection: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  primaryButton: {
    width: "100%",
    marginBottom: 16,
    height: 48,
    backgroundColor: "#3B82F6",
    borderRadius: 8,
  },
  secondaryButton: {
    width: "100%",
    height: 48,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#3B82F6",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  backButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
    color: "#4B5563",
  },
  link: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});

export default RootScreen;
