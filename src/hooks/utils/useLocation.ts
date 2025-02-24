import React, { useEffect, useState, useCallback } from "react";
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  hasServicesEnabledAsync,
  enableNetworkProviderAsync,
} from "expo-location";
import { Platform, Alert, Linking } from "react-native";
import * as Device from "expo-device";

interface LocationHookResult {
  location: LocationObject | null;
  error: string | null;
  isLoading: boolean;
  requestPermission: () => Promise<void>;
  refreshLocation: () => Promise<void>;
  openLocationSettings: () => Promise<void>;
}

interface LocationError {
  code?: number;
  message: string;
}

const useLocation = (watchMode = false): LocationHookResult => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Use expo-device to check for emulator
  const isEmulator = !Device.isDevice;

  const openLocationSettings = async () => {
    if (Platform.OS === "ios") {
      // For iOS Expo client
      await Linking.openURL("app-settings:");
    } else {
      // For Android
      await Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
    }
  };

  const handleLocationError = (err: LocationError) => {
    let errorMessage = "Error getting location";

    if (isEmulator) {
      if (Platform.OS === "ios") {
        errorMessage =
          'Location services not available in iOS Simulator. Use "Features → Location" to set location.';
      } else {
        errorMessage =
          'Location services not available in Android Emulator. Use "More Options (...) → Location" to set location.';
      }

      Alert.alert(
        "Emulator Detected",
        Platform.OS === "ios"
          ? "To set location in iOS Simulator:\n\n1. Go to Features → Location\n2. Choose a location option"
          : "To set location in Android Emulator:\n\n1. Click More Options (...)\n2. Go to Location\n3. Set a custom location",
        [
          {
            text: Platform.OS === "ios" ? "OK" : "Open Settings",
            onPress: Platform.OS === "ios" ? undefined : openLocationSettings,
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } else {
      switch (err.code) {
        case 1:
          errorMessage = "Location permission denied";
          break;
        case 2:
          errorMessage = "Location service is disabled";
          break;
        case 3:
          errorMessage = "Location request timed out";
          break;
        default:
          errorMessage = err.message || "Failed to get location";
      }
    }

    setError(errorMessage);
    console.error("Location Error:", err);
  };

  const checkLocationServices = async (): Promise<boolean> => {
    try {
      const enabled = await hasServicesEnabledAsync();
      if (!enabled) {
        // Try to enable network provider for Android
        if (Platform.OS === "android") {
          try {
            await enableNetworkProviderAsync();
            return true;
          } catch (err) {
            // If can't enable automatically, show settings alert
            Alert.alert(
              "Location Services Disabled",
              "Please enable location services to use this feature.",
              [
                {
                  text: "Open Settings",
                  onPress: openLocationSettings,
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]
            );
            return false;
          }
        }
        return false;
      }
      return true;
    } catch (err) {
      handleLocationError({ message: "Error checking location services" });
      return false;
    }
  };

  const requestPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      const servicesEnabled = await checkLocationServices();
      if (!servicesEnabled) {
        setError("Location services are disabled");
        return;
      }

      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");

        // Show settings alert for denied permissions
        Alert.alert(
          "Location Permission Required",
          "Please enable location permissions in settings to use this feature.",
          [
            {
              text: "Open Settings",
              onPress: openLocationSettings,
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      } else {
        setError(null);
      }
    } catch (err) {
      handleLocationError({ message: "Error requesting location permission" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      const location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.Balanced,
      });
      setLocation(location);
      setError(null);
    } catch (err) {
      handleLocationError(err as LocationError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshLocation = useCallback(async () => {
    await requestPermission();
    if (!error) {
      await getLocation();
    }
  }, [requestPermission, getLocation, error]);

  useEffect(() => {
    let locationSubscription: LocationSubscription | null = null;
    let mounted = true;

    (async () => {
      await requestPermission();
      if (!error && mounted) {
        if (watchMode) {
          try {
            locationSubscription = await watchPositionAsync(
              {
                accuracy: LocationAccuracy.Balanced,
                timeInterval: 5000,
                distanceInterval: 10,
              },
              (newLocation) => {
                if (mounted) {
                  setLocation(newLocation);
                  setError(null);
                }
              }
            );
          } catch (err) {
            if (mounted) {
              handleLocationError(err as LocationError);
            }
          }
        } else {
          await getLocation();
        }
      }
    })();

    return () => {
      mounted = false;
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [watchMode, requestPermission, getLocation, error]);

  return {
    location,
    error,
    isLoading,
    requestPermission,
    refreshLocation,
    openLocationSettings,
  };
};

export default useLocation;
