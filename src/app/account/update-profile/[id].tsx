import React from "react";
import { SafeAreaView, Text, View } from "react-native";
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

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileFormScreen = () => {
  const { data, isLoading, isError } = useFetchProfile();
  const { mutate, isPending } = useUpdateProfile();

  const defaultValues = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  };

  const form = useForm<ProfileFormData>({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = form;

  // Move the useEffect outside of any conditional rendering
  React.useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <NotFoundScreen />;

  const onSubmit = React.useCallback(
    (values: ProfileFormData) => {
      mutate(values as any);
    },
    [mutate]
  );

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
      label: "Phone Number",
      name: "phone_number" as const,
      placeholder: "Enter your phone number",
      keyboardType: "phone-pad",
    },
  ] as const;

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

      <SafeAreaView className="bg-white flex-1 justify-between">
        <FormProvider {...form}>
          <YStack className="px-4 py-2">
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

        <View className="p-4">
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className={isPending ? "opacity-70" : ""}
          >
            <Text className="text-lg font-semibold text-white">
              {isPending ? "Updating..." : "Update"}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileFormScreen;
