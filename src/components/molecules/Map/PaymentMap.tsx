import { View, Text, StyleSheet } from "react-native";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { MapPin, MapIcon } from "lucide-react-native";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import Button from "@/components/ui/Button";
import useReverseGeocode from "@/hooks/maps/useReverseGeocode";

const PaymentMap = () => {
  const { address } = useReverseGeocode();
  return (
    <YStack style={styles.container}>
      <XStack style={styles.headerContainer}>
        <MapPin color="#F4891F" />
        <Text style={styles.headerText}>Delivery Address</Text>
      </XStack>

      <View style={styles.mapContainer}>
        <CurrentLocationMap />
      </View>

      {Boolean(address) && (
        <Button variant="outline" style={styles.button}>
          <MapIcon color="#F4891F" />
          <Text style={styles.addressText}>{address}</Text>
        </Button>
      )}
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12, // equivalent to space-y-3
  },
  headerContainer: {
    alignItems: "center",
    gap: 8, // equivalent to space-x-2
  },
  headerText: {
    fontSize: 18, // equivalent to text-lg
    fontWeight: "600", // equivalent to font-semibold
  },
  mapContainer: {
    borderRadius: 6, // equivalent to rounded-md
    borderWidth: 1,
    borderColor: "rgba(244, 137, 31, 0.7)", // equivalent to border-primary/70
    overflow: "hidden",
    height: 200,
  },
  button: {
    borderColor: "#d6d3d1", // equivalent to border-stone-300
    gap: 8, // equivalent to space-x-2
    flexDirection: "row",
  },
  addressText: {
    fontSize: 16, // equivalent to text-base
    fontWeight: "600", // equivalent to font-semibold
  },
});

export default PaymentMap;
