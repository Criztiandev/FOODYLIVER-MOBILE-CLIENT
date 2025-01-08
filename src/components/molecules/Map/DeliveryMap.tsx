import useLocation from "@/hooks/utils/useLocation";
import React, { FC, useEffect, useRef, useState } from "react";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
  Circle,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface Props {
  targetRegion: {
    latitude: number;
    longitude: number;
  };
  onProximityChange: (isNearby: boolean) => void;
  googleMapsApiKey: string;
}

const PROXIMITY_RADIUS = 100; // 1000km in meters

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

const DeliveryMap: FC<Props> = ({
  targetRegion,
  onProximityChange,
  googleMapsApiKey,
}) => {
  const mapRef = useRef<MapView>(null);
  const { location, error } = useLocation(true);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    if (location?.coords) {
      const { latitude, longitude } = location.coords;

      // Calculate distance from current location to target
      const distance = calculateDistance(
        latitude,
        longitude,
        targetRegion.latitude,
        targetRegion.longitude
      );

      const isNearby = distance <= PROXIMITY_RADIUS;
      onProximityChange(isNearby);

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setInitialRegion(newRegion);
    }
  }, [location, targetRegion]);

  if (!initialRegion) return null;

  return (
    <MapView
      ref={mapRef}
      className="w-full h-full"
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton
    >
      <Marker
        coordinate={{
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
        }}
        title="Your Location"
      />

      <Marker coordinate={targetRegion} title="Destination" />

      <Circle
        center={targetRegion}
        radius={PROXIMITY_RADIUS}
        fillColor="rgba(255, 124, 2, 0.2)"
        strokeColor="rgba(255, 124, 2, 0.5)"
      />

      <MapViewDirections
        origin={initialRegion}
        destination={targetRegion}
        apikey={googleMapsApiKey}
        strokeWidth={4}
        strokeColor="#FF7C02"
        optimizeWaypoints={true}
      />
    </MapView>
  );
};

export default DeliveryMap;
