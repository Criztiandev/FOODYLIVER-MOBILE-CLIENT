import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Home, Plus } from "lucide-react-native";
import BackButton from "@/components/atoms/button/BackButton";
import YStack from "@/components/stacks/YStack";
import BaseLayout from "@/layout/BaseLayout";
import Button from "@/components/ui/Button";
import useReverseGeocode from "@/hooks/maps/useReverseGeocode";
import CurrentLocationMap from "@/components/molecules/Map/CurrentLocationMap";
import XStack from "@/components/stacks/XStack";

const RootScreen = () => {
  const router = useRouter();
  const { address } = useReverseGeocode();

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
      <View style={styles.container}>
        <BaseLayout>
          <YStack style={styles.content}>
            <View style={styles.mapContainer}>
              <CurrentLocationMap />
            </View>

            <View style={styles.addressCard}>
              <XStack style={styles.addressContent}>
                <Home color="#F4891F" size={24} />
                <Text style={styles.addressText}>
                  {!address ? "Getting your location..." : address}
                </Text>
              </XStack>
            </View>

            <Button
              style={styles.updateButton}
              onPress={() => router.push("/account/address/new-address")}
            >
              <View style={styles.buttonContent}>
                <Plus color="white" size={22} />
                <Text style={styles.buttonText}>Update Address</Text>
              </View>
            </Button>
          </YStack>
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
  content: {
    padding: 16,
    gap: 16,
  },
  mapContainer: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(244, 137, 31, 0.7)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addressCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "rgba(244, 137, 31, 0.7)",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addressContent: {
    alignItems: "center",
    gap: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
  },
  updateButton: {
    backgroundColor: "#F4891F",
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 3,
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

export default RootScreen;
