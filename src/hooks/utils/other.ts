export const calculateDistance = (
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

export const MAP_CONSTANTS = {
  INITIAL_ZOOM: 12,
  ANIMATION_DURATION: 1000,
  DEFAULT_COORDS: {
    latitude: 37.78825,
    longitude: -122.4324,
  },
  PROXIMITY_RADIUS: 1000, // meters
  MAP_DELTAS: {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
} as const;

export const APP_CONSTANTS = {
  PHONE_NUMBER: "093838283838",
} as const;
