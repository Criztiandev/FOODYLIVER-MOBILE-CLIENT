import React, { FC, useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import useLocation from "@/hooks/utils/useLocation";
import { LocationObject } from "expo-location";
import MapViewDirections from "react-native-maps-directions";

interface Props {
  targetRegion: {
    latitude: number;
    longitude: number;
  };
}

const initialZoom = 12;
const animationDuration = 1000;

const DeliveryMap: FC<Props> = ({ targetRegion }) => {
  const mapRef = useRef<MapView | null>(null);
  const { location, error } = useLocation(true); // Using watch mode
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

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
      />

      <Marker
        coordinate={{
          latitude: targetRegion?.latitude || 0,
          longitude: targetRegion?.longitude || 0,
        }}
      />

      <MapViewDirections
        origin={initialRegion}
        destination={{
          latitude: targetRegion.latitude,
          longitude: targetRegion.longitude,
        }}
        apikey={"AIzaSyD2S3-_jyyJJLOJdCzEeGLY31egBsD4i1Y"}
        strokeWidth={4}
        strokeColor="#FF7C02"
        optimizeWaypoints={true}
      />
    </MapView>
  );
};

export default DeliveryMap;
