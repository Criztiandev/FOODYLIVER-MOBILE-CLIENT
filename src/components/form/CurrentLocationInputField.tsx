// import { View, Text, PermissionsAndroid, Platform } from "react-native";
// import React, { FC, useState, useEffect } from "react";
// import Input, { InputProps } from "../ui/Input";
// import { useFormContext, Controller, FieldError } from "react-hook-form";
// import { cn } from "@/lib/utils";
// import Label from "../ui/Label";
// import Geolocation from "react-native-geolocation-service";
// import Geocoder from "react-native-geocoding";

// interface LocationValue {
//   formatted_address: string;
//   coordinates?: {
//     lat: number;
//     lng: number;
//   };
// }

// interface Props extends Omit<InputProps, "defaultValue"> {
//   name: string;
//   label?: string;
//   labelClassName?: string;
//   defaultValue?: LocationValue;
// }

// const CurrentLocationInputField: FC<Props> = ({
//   className,
//   label,
//   labelClassName,
//   defaultValue,
//   ...props
// }) => {
//   const {
//     getValues,
//     control,
//     formState: { errors },
//     setValue,
//     clearErrors,
//   } = useFormContext();

//   const [locationError, setLocationError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const requestLocationPermission = async () => {
//     try {
//       if (Platform.OS === "ios") {
//         const auth = await Geolocation.requestAuthorization("whenInUse");
//         if (auth === "granted") {
//           return true;
//         }
//       }

//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Location Permission",
//             message: "This app needs access to your location.",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK",
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           return true;
//         }
//       }
//       return false;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       setIsLoading(true);
//       setLocationError(null);

//       const hasPermission = await requestLocationPermission();

//       if (!hasPermission) {
//         setLocationError("Permission to access location was denied");
//         return;
//       }

//       Geolocation.getCurrentPosition(
//         async (position) => {
//           try {
//             // Using react-native-geocoding to get address from coordinates
//             const response = await Geocoder.from(
//               position.coords.latitude,
//               position.coords.longitude
//             );

//             if (response.results && response.results.length > 0) {
//               const formattedAddress = response.results[0].formatted_address;

//               const locationValue = {
//                 formatted_address: formattedAddress,
//                 coordinates: {
//                   lat: position.coords.latitude,
//                   lng: position.coords.longitude,
//                 },
//               };

//               setValue(props.name, locationValue);
//               clearErrors(props.name);
//             }
//           } catch (error) {
//             console.error("Geocoding error:", error);
//             setLocationError("Error getting address. Please try again.");
//           }
//           setIsLoading(false);
//         },
//         (error) => {
//           console.error("Location error:", error);
//           setLocationError("Error getting location. Please try again.");
//           setIsLoading(false);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//         }
//       );
//     } catch (error) {
//       setLocationError("Error getting location. Please try again.");
//       console.error("Location error:", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (defaultValue) {
//       setValue(props.name, defaultValue);
//     } else {
//       getCurrentLocation();
//     }
//   }, [defaultValue, props.name, setValue]);

//   const currentValue = getValues(props.name);

//   return (
//     <View className={cn("mb-4 w-full", className)}>
//       <Controller
//         control={control}
//         name={props.name}
//         rules={{ required: true }}
//         defaultValue={defaultValue}
//         render={({ field: { onChange, value } }) => (
//           <View>
//             {label && (
//               <Label className={cn("mb-2 font-semibold", labelClassName)}>
//                 {label}
//               </Label>
//             )}

//             <Input
//               {...props}
//               value={currentValue?.formatted_address || ""}
//               editable={false}
//               placeholder={
//                 isLoading
//                   ? "Getting current location..."
//                   : "Your current location"
//               }
//             />

//             {locationError && (
//               <Text className="text-error mt-1 text-sm">{locationError}</Text>
//             )}
//           </View>
//         )}
//       />
//       {errors[props.name] && (
//         <Text className="text-error">
//           {(errors[props.name] as FieldError)?.message}
//         </Text>
//       )}
//     </View>
//   );
// };

// export default CurrentLocationInputField;
