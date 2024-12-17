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

      {address && (
        <Button
          variant="outline"
          className="border-stone-300 space-x-2 flex-row"
        >
          <MapIcon color="#F4891F" />
          <Text className="text-base font-semibold">{address}</Text>
        </Button>
      )}
    </YStack>
  );
};

export default PaymentMap;
