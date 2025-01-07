import React, { useState } from "react";
import { View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Home, Plus } from "lucide-react-native";
import BackButton from "@/components/atoms/button/BackButton";
import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import Button from "@/components/ui/Button";
import useReverseGeocode from "@/hooks/maps/useReverseGeocode";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import XStack from "@/components/stacks/XStack";

const RootScreen = () => {
  const [selectedAddress, setSelectedAddress] =
    useState<GooglePlaceDetail | null>(null);
  const router = useRouter();
  const { address } = useReverseGeocode();

  const handleSelectAddress = (value: GooglePlaceDetail | null) => {
    setSelectedAddress(value);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "My Address",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          },
          headerStyle: {
            backgroundColor: "#F4891F",
          },
        }}
      />
      <View className="bg-white flex-1">
        <BaseLayout>
          <YStack className="p-4 space-y-4">
            <View className="w-full h-[300px] rounded-lg overflow-hidden border-2 border-primary/70 shadow-sm">
              <CurrentLocationMap />
            </View>

            <View className="rounded-lg px-4 py-3 border-2 border-primary/70 bg-white shadow-sm">
              <XStack className="items-center space-x-3">
                <Home color="#F4891F" size={24} />
                <Text className="flex-1 text-base">
                  {!address ? "Getting your location..." : address}
                </Text>
              </XStack>
            </View>

            <Button
              className="flex-row justify-center space-x-2 py-3 bg-primary"
              onPress={() => router.push("/account/address/new-address")}
            >
              <Plus color="white" size={22} />
              <Text className="text-base font-bold text-white">
                Update Address
              </Text>
            </Button>
          </YStack>
        </BaseLayout>
      </View>
    </>
  );
};

export default RootScreen;
