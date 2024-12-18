import React, { FC } from "react";
import { View } from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { cn } from "@/lib/utils";

interface Props {
  onSelect: (value: GooglePlaceDetail | null) => void;
  className?: string;
  defaultValue?: string;
}

const AddressSearch: FC<Props> = ({ onSelect, className, defaultValue }) => {
  return (
    <View className={cn("w-full z-50", className)}>
      <GooglePlacesAutocomplete
        placeholder="Search for a place"
        onPress={(_, details = null) => onSelect(details || null)}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: "fil",
          components: "country:ph",
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        textInputProps={{
          defaultValue: defaultValue,
        }}
        styles={{
          container: {
            flex: 0,
            position: "relative",
            zIndex: 1,
          },
          textInputContainer: {
            padding: 0,
            margin: 0,
            backgroundColor: "transparent",
          },
          textInput: {
            height: 48, // h-12 equivalent
            borderWidth: 1,
            borderColor: "#d4d4d4", // stone-300 equivalent
            borderRadius: 6, // rounded-md equivalent
            paddingHorizontal: 12, // px-3 equivalent
            fontSize: 16, // text-base equivalent
            backgroundColor: "transparent",
            color: "#000000",
          },
          listView: {
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#d4d4d4",
            borderRadius: 6,
            marginTop: 4,
            zIndex: 2,
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          row: {
            padding: 12,
            height: 48,
            flexDirection: "row",
          },
          separator: {
            height: 1,
            backgroundColor: "#d4d4d4",
          },
          description: {
            fontSize: 14,
          },
        }}
      />
    </View>
  );
};

export default AddressSearch;
