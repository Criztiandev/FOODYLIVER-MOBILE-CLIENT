import React, { useEffect, useState, useCallback } from "react";
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
} from "expo-location";

interface LocationHookResult {
  location: LocationObject | null;
  error: string | null;
  requestPermission: () => Promise<void>;
  refreshLocation: () => Promise<void>;
}

const useLocation = (watchMode = false): LocationHookResult => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
      } else {
        setError(null);
      }
    } catch (err) {
      setError("Error requesting location permission");
      console.error(err);
    }
  }, []);

  const getLocation = useCallback(async () => {
    try {
      const location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.Balanced,
      });
      setLocation(location);
    } catch (err) {
      setError("Error getting current location");
      console.error(err);
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

    (async () => {
      await requestPermission();
      if (!error) {
        if (watchMode) {
          locationSubscription = await watchPositionAsync(
            {
              accuracy: LocationAccuracy.Balanced,
              timeInterval: 5000,
              distanceInterval: 10,
            },
            (newLocation) => {
              setLocation(newLocation);
            }
          );
        } else {
          await getLocation();
        }
      }
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [watchMode, requestPermission, getLocation, error]);

  return { location, error, requestPermission, refreshLocation };
};

export default useLocation;
