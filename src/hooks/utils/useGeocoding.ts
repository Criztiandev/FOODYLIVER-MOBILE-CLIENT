import { useState, useCallback, useEffect } from "react";
import Geocoder from "react-native-geocoding";

interface GeocodingResult {
  latitude: number;
  longitude: number;
  address: string;
}

interface UseGeocodingResult {
  geocodeAddress: (address: string) => Promise<GeocodingResult | null>;
  reverseGeocode: (
    latitude: number,
    longitude: number
  ) => Promise<GeocodingResult | null>;
  loading: boolean;
  error: string | null;
}

const useGeocoding = (): UseGeocodingResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeGeocoder = async () => {
      try {
        const apiKey = "AIzaSyD2S3-_jyyJJLOJdCzEeGLY31egBsD4i1Y";

        if (!apiKey) {
          throw new Error(
            "Google Maps API key is not set in environment variables"
          );
        }
        Geocoder.init(apiKey);
        setIsInitialized(true);
      } catch (err) {
        setError(
          "Failed to initialize Geocoder: " +
            (err instanceof Error ? err.message : String(err))
        );
        console.error("Geocoder initialization error:", err);
      }
    };

    initializeGeocoder();
  }, []);

  const geocodeAddress = useCallback(
    async (address: string): Promise<GeocodingResult | null> => {
      if (!isInitialized) {
        setError("Geocoder is not initialized");
        return null;
      }

      setLoading(true);
      setError(null);
      try {
        const result = await Geocoder.from(address);
        if (result.results.length > 0) {
          const { lat, lng } = result.results[0].geometry.location;
          return {
            latitude: lat,
            longitude: lng,
            address: result.results[0].formatted_address,
          };
        }
        return null;
      } catch (err) {
        setError(
          "Error geocoding address: " +
            (err instanceof Error ? err.message : String(err))
        );
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [isInitialized]
  );

  const reverseGeocode = useCallback(
    async (
      latitude: number,
      longitude: number
    ): Promise<GeocodingResult | null> => {
      if (!isInitialized) {
        setError("Geocoder is not initialized");
        return null;
      }

      setLoading(true);
      setError(null);
      try {
        const result = await Geocoder.from(latitude, longitude);
        if (result.results.length > 0) {
          return {
            latitude,
            longitude,
            address: result.results[0].formatted_address,
          };
        }
        return null;
      } catch (err) {
        setError(
          "Error reverse geocoding coordinates: " +
            (err instanceof Error ? err.message : String(err))
        );
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [isInitialized]
  );

  return {
    geocodeAddress,
    reverseGeocode,
    loading,
    error,
  };
};

export default useGeocoding;
