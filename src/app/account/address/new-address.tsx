import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Home, Save } from "lucide-react-native";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

import BackButton from "@/components/atoms/button/BackButton";
import AddressSearch from "@/components/atoms/search/AddressSearch";
import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import Button from "@/components/ui/Button";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import useUpdateProfile from "@/hooks/account/useUpdateProfile";

interface AddressPayload {
  address: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
}

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const AddressScreen: React.FC = () => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] =
    useState<GooglePlaceDetail | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useUpdateProfile();

  const handleSelectAddress = (value: GooglePlaceDetail | null) => {
    setError(null);
    setSelectedAddress(value);
  };

  const extractAddressComponents = (
    components: GooglePlaceDetail["address_components"] = []
  ) => {
    const city =
      components?.find((component) => component.types.includes("locality"))
        ?.long_name || "";

    const postal_code =
      components?.find((component) => component.types.includes("postal_code"))
        ?.long_name || "";

    return { city, postal_code };
  };

  const handleSetAddress = async () => {
    if (!selectedAddress) {
      setError("Please select an address");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const {
        formatted_address,
        geometry: { location },
        address_components,
      } = selectedAddress;

      const { city, postal_code } =
        extractAddressComponents(address_components);

      const payload: AddressPayload = {
        address: formatted_address,
        city,
        postal_code,
        latitude: location.lat,
        longitude: location.lng,
      };

      await mutate(payload as any);
      router.back(); // Navigate back on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Add New Address",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#F4891F",
          },
        }}
      />
      <View className="bg-white flex-1">
        <BaseLayout>
          <YStack className="p-2">
            <View
              className="w-full rounded-md overflow-hidden border border-primary/70"
              style={{ height: 300 }}
            >
              <CurrentLocationMap />
            </View>

            {error && (
              <Text className="text-red-500 mt-2 text-center">{error}</Text>
            )}

            <>
              <View className="">
                <AddressSearch onSelect={handleSelectAddress} />
              </View>
              <Button
                className="flex-row space-x-2 my-4"
                onPress={handleSetAddress}
                disabled={isSubmitting || isPending}
              >
                <Save color="white" />
                <Text className="text-base font-semibold text-white">
                  {isSubmitting ? "Saving..." : "Save Address"}
                </Text>
              </Button>
            </>
          </YStack>
        </BaseLayout>
      </View>
    </>
  );
};

export default AddressScreen;
