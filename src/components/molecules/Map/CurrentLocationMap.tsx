import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import useLocation from "@/hooks/utils/useLocation";

interface Props extends PropsWithChildren {
  initialZoom?: number;
  animationDuration?: number;
}

const CurrentLocationMap: FC<Props> = ({
  initialZoom = 12,
  animationDuration = 1000,
}) => {
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
    </MapView>
  );
};

export default CurrentLocationMap;
