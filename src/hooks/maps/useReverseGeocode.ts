import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useLocation from "../utils/useLocation";
import useGeocoding from "../utils/useGeocoding";

const useReverseGeocode = () => {
  const [address, setAddress] = useState("");
  const { location } = useLocation();
  const { reverseGeocode } = useGeocoding();

  useEffect(() => {
    (async () => {
      if (location?.coords) {
        const result = await reverseGeocode(
          location.coords.latitude,
          location.coords.longitude
        );
        setAddress(result?.address || "");
      }
    })();
  }, [location]);
  return { address };
};

export default useReverseGeocode;
