import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Save } from "lucide-react-native";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

import BackButton from "@/components/atoms/button/BackButton";
import AddressSearch from "@/components/atoms/search/AddressSearch";
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
        ?.long_name ?? "";

    const postal_code =
      components?.find((component) => component.types.includes("postal_code"))
        ?.long_name ?? "";

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

      mutate(payload as any);
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
      <View style={styles.container}>
        <BaseLayout>
          <View style={styles.contentContainer}>
            <View
              style={[
                styles.mapContainer,
                {
                  height: Dimensions.get("screen").height - 150,
                },
              ]}
            >
              <CurrentLocationMap />
            </View>

            <View style={styles.searchContainer}>
              <AddressSearch onSelect={handleSelectAddress} />
            </View>

            <View style={styles.bottomContainer}>
              {error && <Text style={styles.errorText}>{error}</Text>}

              <Button
                style={styles.saveButton}
                onPress={handleSetAddress}
                disabled={isPending}
              >
                <View style={styles.buttonContent}>
                  <Save color="white" size={22} />
                  <Text style={styles.buttonText}>
                    {isPending ? "Saving..." : "Save Address"}
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </BaseLayout>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  mapContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchContainer: {
    position: "absolute",
    top: 16,
    left: 8,
    right: 8,
    zIndex: 10,
  },
  searchInput: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(244, 137, 31, 0.7)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 16,
    left: 8,
    right: 8,
    zIndex: 10,
  },
  errorText: {
    color: "#EF4444",
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: "#F4891F",
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});

export default AddressScreen;
