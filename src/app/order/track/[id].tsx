import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View, Alert } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { Phone, Truck } from "lucide-react-native";

import useLocation from "@/hooks/utils/useLocation";
import DeliveryMap from "@/components/molecules/Map/DeliveryMap";
import Button from "@/components/ui/Button";
import XStack from "@/components/stacks/XStack";
import HomeButton from "@/components/atoms/button/HomeButton";
import { MAP_CONSTANTS } from "@/hooks/utils/other";
import useDeliverOrder from "@/hooks/order/useDeliverOrder";
import Toast from "react-native-toast-message";

const RootScreen = () => {
  const params = useLocalSearchParams<{
    lat: string;
    long: string;
    id: string;
    customer_id: string;
  }>();

  const { location, error } = useLocation(true);
  const { mutate, isPending: isDeliveryInProgress } = useDeliverOrder(
    params?.id || ""
  );

  const [isNearDestination, setIsNearDestination] = useState(false);
  const [locationStatus, setLocationStatus] = useState({
    isLoading: true,
    error: null as string | null,
  });

  const destination = {
    latitude: Number(params?.lat) || MAP_CONSTANTS.DEFAULT_COORDS.latitude,
    longitude: Number(params?.long) || MAP_CONSTANTS.DEFAULT_COORDS.longitude,
  };

  useEffect(() => {
    if (error) {
      setLocationStatus({
        isLoading: false,
        error: "Error accessing location services",
      });
      return;
    }

    if (!location) {
      setLocationStatus({
        isLoading: true,
        error: null,
      });
      return;
    }

    const { latitude, longitude } = location.coords;
    if (!latitude || !longitude) {
      setLocationStatus({
        isLoading: false,
        error: "Invalid location coordinates received",
      });
      return;
    }

    setLocationStatus({
      isLoading: false,
      error: null,
    });
  }, [location, error]);

  const handleCall = async () => {
    try {
      await Linking.openURL(`tel:${params?.customer_id || "09482883838"}`);
    } catch (error) {
      console.error("Error opening phone app:", error);
      Alert.alert(
        "Error",
        "Unable to make phone call. Please check your phone settings and try again."
      );
    }
  };

  const handleDeliver = async () => {
    if (!isNearDestination) {
      Toast.show({
        type: "error",
        text1: "Cannot Complete Delivery",
        text2:
          "Please move closer to the delivery location to complete the delivery.",
      });
      return;
    }

    try {
      await mutate({
        transaction_id: params?.id,
        status: "DELIVERED",
      });
    } catch (error) {
      console.error("Error initiating delivery:", error);
      Toast.show({
        type: "error",
        text1: "Delivery Error",
        text2: "Failed to complete delivery. Please try again.",
      });
    }
  };

  const handleProximityChange = (isNearby: boolean) => {
    setIsNearDestination(isNearby);
  };

  const LoadingView = () => (
    <View className="flex-1 justify-center items-center space-y-4 bg-white">
      <ActivityIndicator size="large" color="#f4891f" />
      <Text className="text-gray-600 font-medium">
        Getting your location...
      </Text>
    </View>
  );

  const ErrorView = ({ message }: { message: string }) => (
    <View className="flex-1 justify-center items-center p-4 bg-white">
      <Text className="text-red-500 text-lg font-bold text-center mb-2">
        {message}
      </Text>
      <Text className="text-gray-500 text-center">
        Please ensure location services are enabled and try again
      </Text>
    </View>
  );

  if (locationStatus.isLoading) return <LoadingView />;
  if (locationStatus.error) return <ErrorView message={locationStatus.error} />;
  if (!location?.coords.latitude || !location?.coords.longitude) {
    return <ErrorView message="Unable to get your current location" />;
  }

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerLeft: () => <HomeButton />,
          title: "Delivery Details",
          headerTitleStyle: {
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <DeliveryMap
        targetRegion={destination}
        onProximityChange={handleProximityChange}
        googleMapsApiKey="AIzaSyACcQI_2ajppwlgGZ_9kD_YHGcuM0f7AEo"
      />

      <View className="p-4 absolute bottom-0 left-0 w-full space-y-4 bg-white bg-opacity-95 rounded-t-xl shadow-lg">
        {isNearDestination ? (
          <View className="bg-green-500 p-3 rounded-lg">
            <Text className="text-white text-center font-medium">
              You have arrived at the destination!
            </Text>
          </View>
        ) : (
          <View className="bg-yellow-500 p-3 rounded-lg">
            <Text className="text-white text-center font-medium">
              Move closer to the delivery location to complete the delivery
            </Text>
          </View>
        )}

        <XStack className="w-full space-x-4 items-center">
          <Button
            variant="default"
            onPress={handleDeliver}
            disabled={!isNearDestination || isDeliveryInProgress}
            className={`flex-1 ${!isNearDestination ? "opacity-50" : ""} h-12`}
          >
            <XStack className="items-center space-x-2">
              <Truck color="white" size={24} />
              <Text className="text-lg text-white font-semibold">
                {isDeliveryInProgress
                  ? "Processing..."
                  : isNearDestination
                  ? "Complete Delivery"
                  : "Get Closer"}
              </Text>
            </XStack>
          </Button>

          <Button
            variant="secondary"
            size="icon"
            onPress={handleCall}
            className="bg-green-700 h-12 w-12"
          >
            <Phone color="white" size={24} />
          </Button>
        </XStack>
      </View>
    </View>
  );
};

export default RootScreen;
