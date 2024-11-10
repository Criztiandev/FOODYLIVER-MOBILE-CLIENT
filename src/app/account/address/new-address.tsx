import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Home, Plus, Save } from "lucide-react-native";
import BackButton from "@/components/atoms/button/BackButton";
import AddressSearch from "@/components/atoms/search/AddressSearch";
import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import Button from "@/components/ui/Button";
import useReverseGeocode from "@/hooks/maps/useReverseGeocode";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

const RootScreen = () => {
  const [selectedAddress, setSelectedAddress] =
    useState<GooglePlaceDetail | null>(null);
  const router = useRouter();
  const { address } = useReverseGeocode();

  const handleSelectAddress = (value: GooglePlaceDetail | null) => {
    setSelectedAddress(value);
  };

  const handleSetAddress = () => {
    console.log("Selected Address");
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
        <View className=" px-2 mt-2">
          <AddressSearch onSelect={handleSelectAddress} />
        </View>

        <BaseLayout>
          <YStack className="p-2">
            <View
              className="w-full  rounded-md overflow-hidden border border-primary/70"
              style={{
                height: Dimensions.get("screen").height - 320,
              }}
            >
              <CurrentLocationMap />
            </View>

            {selectedAddress && (
              <>
                <View className="rounded-md px-4 py-2 border mt-4 border-primary/70 flex-row items-center space-x-2">
                  <Home color="black" size={20} />
                  <Text className="flex-1 text-sm">
                    {selectedAddress.formatted_address || "Loading..."}
                  </Text>
                </View>

                <Button
                  className="flex-row space-x-2 my-4"
                  onPress={handleSetAddress}
                >
                  <Save color="white" />
                  <Text className="text-base font-semibold text-white">
                    Save Address
                  </Text>
                </Button>
              </>
            )}
          </YStack>
        </BaseLayout>
      </View>
    </>
  );
};

export default RootScreen;
