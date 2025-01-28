import React, { useState } from "react";
import InputField from "@/components/form/InputField";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import XStack from "@/components/stacks/XStack";
import CurrentLocationInputField from "@/components/molecules/Map/CurrentLocationInputField";
import { ChevronDown } from "lucide-react-native";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";

const AddressInfoStep = () => {
  const [isOptionalAddress, setIsOptionalAddress] = useState(false);
  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.mapContainer}>
        <CurrentLocationMap />
      </View>
      <CurrentLocationInputField name="address" label="Complete Address" />

      <TouchableOpacity
        onPress={() => setIsOptionalAddress(!isOptionalAddress)}
      >
        <XStack style={styles.headerContainer}>
          <Text style={styles.headerText}>Other Details</Text>

          <ChevronDown size={24} color="black" />
        </XStack>
      </TouchableOpacity>

      {isOptionalAddress && (
        <View style={styles.formContainer}>
          <XStack style={styles.rowContainer}>
            <View style={styles.flexOne}>
              <InputField
                label="House/Unit No."
                name="house_number"
                placeholder="Enter house/unit number"
              />
            </View>

            <View style={styles.flexOne}>
              <InputField
                label="Street"
                name="street"
                placeholder="Enter street name"
              />
            </View>
          </XStack>

          <InputField
            label="Barangay"
            name="barangay"
            placeholder="Enter barangay"
          />

          <InputField
            label="Postal code"
            name="postal_code"
            placeholder="Enter postal code"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  mapContainer: {
    height: 300,
    borderRadius: 6,
    borderColor: "#d6d3d1",
    width: "100%",
    marginBottom: 16,
    backgroundColor: "black",
  },
  headerContainer: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    color: "#F4891F",
    fontWeight: "600",
  },
  formContainer: {
    width: "100%",
  },
  rowContainer: {
    columnGap: 16,
  },
  flexOne: {
    flex: 1,
  },
});

export default AddressInfoStep;
