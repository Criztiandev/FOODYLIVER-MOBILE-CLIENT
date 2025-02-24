import React from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import BackButton from "@/components/atoms/button/BackButton";
import InputField from "@/components/form/InputField";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import useFetchProfile from "@/hooks/account/useFetchProfile";
import useUpdateProfile from "@/hooks/account/useUpdateProfile";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import NotFoundScreen from "@/layout/screen/NotFoundScreen";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import AddressInputField from "@/components/form/AddressField";

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const formFields = [
  {
    label: "Username",
    name: "username" as const,
    placeholder: "Enter your username",
  },
  {
    label: "First Name",
    name: "first_name" as const,
    placeholder: "Enter your first name",
  },
  {
    label: "Last Name",
    name: "last_name" as const,
    placeholder: "Enter your last name",
  },
  {
    label: "Email",
    name: "email" as const,
    placeholder: "Enter your email",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    label: "address",
    name: "address" as const,
    placeholder: "Enter your address",
  },
  {
    label: "Phone Number",
    name: "phone_number" as const,
    placeholder: "Enter your phone number",
    keyboardType: "phone-pad",
  },
] as const;

const defaultValues: ProfileFormData = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
};

const ProfileFormScreen = () => {
  const { data, isLoading, isError } = useFetchProfile();
  const { mutate, isPending } = useUpdateProfile();

  const form = useForm<ProfileFormData>({
    defaultValues,
  });

  const { handleSubmit, reset } = form;

  React.useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = React.useCallback(
    (values: ProfileFormData) => {
      mutate(values as any);
    },
    [mutate]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Update Profile",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
        }}
      />

      <SafeAreaView style={styles.container}>
        {/* <View style={styles.mapContainer}>
          <CurrentLocationMap />
        </View> */}

        <FormProvider {...form}>
          <YStack style={styles.formContainer}>
            {formFields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
              />
            ))}
          </YStack>
        </FormProvider>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            style={[styles.button, isPending && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>
              {isPending ? "Updating..." : "Update"}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  mapContainer: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(244, 137, 31, 0.7)",
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    backgroundColor: "#F4891F",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});

export default ProfileFormScreen;
