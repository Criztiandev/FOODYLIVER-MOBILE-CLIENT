import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Save } from "lucide-react-native";
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

const AddressScreen: React.FC = () => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] =
    useState<GooglePlaceDetail | null>(null);
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
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save address");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Add New Address",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#F4891F" },
        }}
      />
      <View className="bg-white flex-1">
        <BaseLayout>
          <View className="flex-1 relative">
            <View
              className="w-full absolute top-0 left-0 right-0 bottom-0"
              style={{
                height: Dimensions.get("screen").height - 150,
              }}
            >
              <CurrentLocationMap />
            </View>

            <View className="absolute top-4 left-2 right-2 z-10">
              <AddressSearch
                onSelect={handleSelectAddress}
                className="bg-white border-2 border-primary/70 rounded-lg shadow-lg"
              />
            </View>

            <View className="absolute bottom-4 left-2 right-2 z-10">
              {error && (
                <Text className="text-red-500 text-center font-medium bg-white/90 p-2 rounded-lg mb-2">
                  {error}
                </Text>
              )}

              <Button
                className="flex-row justify-center space-x-2 py-3 bg-primary shadow-lg"
                onPress={handleSetAddress}
                disabled={isPending}
              >
                <Save color="white" size={22} />
                <Text className="text-base font-bold text-white">
                  {isPending ? "Saving..." : "Save Address"}
                </Text>
              </Button>
            </View>
          </View>
        </BaseLayout>
      </View>
    </>
  );
};

export default AddressScreen;
