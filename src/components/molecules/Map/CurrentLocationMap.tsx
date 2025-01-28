import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import useLocation from "@/hooks/utils/useLocation";
import { StyleSheet, View } from "react-native";

interface Props extends PropsWithChildren {
  initialZoom?: number;
  animationDuration?: number;
  onRegionChange?: (region: Region) => void;
}

const CurrentLocationMap: FC<Props> = ({
  initialZoom = 12,
  animationDuration = 1000,
  onRegionChange,
}) => {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation(true);
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
      onRegionChange?.(newRegion);
    }
  }, [location]);

  const focusMap = (region: Region) => {
    mapRef.current?.animateCamera(
      {
        center: region,
        zoom: initialZoom,
      },
      { duration: animationDuration }
    );
  };

  if (!initialRegion) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
        onRegionChange={onRegionChange}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default CurrentLocationMap;
