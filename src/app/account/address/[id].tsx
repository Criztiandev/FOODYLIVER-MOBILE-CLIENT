import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { Home, Plus } from "lucide-react-native";
import BackButton from "@/components/atoms/button/BackButton";
import AddressSearch from "@/components/atoms/search/AddressSearch";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import YStack from "@/components/stacks/YStack";
import useGeocoding from "@/hooks/utils/useGeocoding";
import useLocation from "@/hooks/utils/useLocation";
import BaseLayout from "@/layout/BaseLayout";
import Button from "@/components/ui/Button";

const RootScreen = () => {
  const [address, setAddress] = useState("");
  const { location } = useLocation();
  const { reverseGeocode } = useGeocoding();

  useEffect(() => {
    (async () => {
      if (location?.coords) {
        const result = await reverseGeocode(
          location.coords.latitude,
          location.coords.longitude
        );
        setAddress(result?.address || "");
      }
    })();
  }, [location]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Details",
        }}
      />
      <View className="bg-white flex-1">
        <View className=" px-2 mt-2">
          <AddressSearch />
        </View>

        <BaseLayout>
          <YStack className="p-2">
            <View className="w-full h-[300px] rounded-md overflow-hidden border border-primary/70">
              <CurrentLocationMap />
            </View>

            <View className="rounded-md px-4 py-2 border mt-4 border-primary/70 flex-row items-center space-x-2">
              <Home color="black" size={20} />
              <Text className="flex-1 text-sm">{address || "Loading..."}</Text>
            </View>

            <Button className="flex-row space-x-2 my-4">
              <Plus color="white" />
              <Text className="text-base font-semibold text-white">
                Add Address
              </Text>
            </Button>
          </YStack>
        </BaseLayout>
      </View>
    </>
  );
};

export default RootScreen;
