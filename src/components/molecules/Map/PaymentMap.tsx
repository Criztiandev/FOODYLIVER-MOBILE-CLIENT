import { View, Text } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { MapPin, MapIcon } from "lucide-react-native";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import useReverseGeocode from "@/hooks/maps/useReverseGeocode";

const PaymentMap = () => {
  const router = useRouter();
  const { address } = useReverseGeocode();
  return (
    <YStack className="space-y-3">
      <XStack className="items-center space-x-2">
        <MapPin color="#F4891F" />
        <Text className="text-lg font-semibold">Delivery Address</Text>
      </XStack>

      <View className="rounded-md border border-primary/70 overflow-hidden h-[200px]">
        <CurrentLocationMap />
      </View>

      <Button variant="outline" className="border-stone-300 space-x-2 flex-row">
        <MapIcon color="#F4891F" />
        <Text className="text-base font-semibold">
          {address || "Current Address"}
        </Text>
      </Button>

      <Button
        className="border-stone-300 space-x-2 flex-row"
        onPress={() => router.push("/account/address")}
      >
        <MapIcon color="white" />
        <Text className="text-white text-base font-semibold">
          Select Addres
        </Text>
      </Button>
    </YStack>
  );
};

export default PaymentMap;
