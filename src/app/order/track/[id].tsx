import React, { FC, useEffect, useRef, useState } from "react";
import MapView, { Region } from "react-native-maps";
import useLocation from "@/hooks/utils/useLocation";
import BaseLayout from "@/layout/BaseLayout";
import { Stack } from "expo-router";
import DeliveryMap from "@/components/molecules/Map/DeliveryMap";
import { Text, View } from "react-native";
import BackButton from "@/components/atoms/button/BackButton";
import Button from "@/components/ui/Button";
import * as Linking from "expo-linking";
import XStack from "@/components/stacks/XStack";
import { Phone } from "lucide-react-native";
import HomeButton from "@/components/atoms/button/HomeButton";

interface Props {
  targetRegion: {
    latitude: number;
    longitude: number;
  };
}

const initialZoom = 12;
const animationDuration = 1000;

const RootScreen: FC<Props> = () => {
  const mapRef = useRef<MapView | null>(null);
  const { location, error } = useLocation(true); // Using watch mode
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  const targetRegion = {
    latitude: 37.44964795610058,
    longitude: -122.15490521863103,
  };

  useEffect(() => {
    if (location) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setInitialRegion(newRegion);
      focusMap(newRegion);
    }
  }, [location]);

  const focusMap = (region: Region) => {
    mapRef.current?.animateCamera(
      { center: region, zoom: initialZoom },
      { duration: animationDuration }
    );
  };

  if (!initialRegion) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <HomeButton />,
          title: "Delivery Details",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <View className="flex-1 ">
        <DeliveryMap
          targetRegion={{
            latitude: 37.44964795610058,
            longitude: -122.15490521863103,
          }}
        />

        <View className="p-4 absolute bottom-0 left-0  w-full">
          <Button
            variant="default"
            onPress={() => Linking.openURL("tel:093838283838")}
          >
            <XStack className="items-center space-x-2">
              <Phone color="white" size={24} />
              <Text className="text-lg text-white font-semibold">
                Call Rider
              </Text>
            </XStack>
          </Button>
        </View>
      </View>
    </>
  );
};

export default RootScreen;
