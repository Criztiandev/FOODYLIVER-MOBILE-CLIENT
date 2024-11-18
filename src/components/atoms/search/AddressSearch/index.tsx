import React, { FC } from "react";
import { View } from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

interface Props {
  onSelect: (value: GooglePlaceDetail | null) => void;
}

const AddressSearch: FC<Props> = ({ onSelect }) => {
  return (
    <View className="w-full z-50">
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
        styles={{
          container: {
            flex: 0,
            position: "relative",
            zIndex: 1,
          },
          textInputContainer: {
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#1e1e1e",
            borderRadius: 6,
            paddingHorizontal: 8,
            height: 44,
            backgroundColor: "white",
          },
          textInput: {
            height: 32,
            color: "#000",
            fontSize: 16,
            backgroundColor: "transparent",
          },
          listView: {
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#8F9098",
            borderRadius: 6,
            marginTop: 4,
            zIndex: 2,
            elevation: 3, // for Android
            shadowColor: "#000", // for iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          row: {
            padding: 13,
            height: 44,
            flexDirection: "row",
          },
          separator: {
            height: 1,
            backgroundColor: "#8F9098",
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
