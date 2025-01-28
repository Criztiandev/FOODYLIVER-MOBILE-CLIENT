import React, { FC, memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

interface Props {
  onSelect: (value: GooglePlaceDetail | null) => void;
  className?: string;
  defaultValue?: string;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 50,
    overflow: "hidden",
  },
  autocompleteContainer: {
    flex: 0,
    position: "relative",
    zIndex: 1,
  },
  textInputContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 6,
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "white",
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
});

const AddressSearch: FC<Props> = memo(({ onSelect, defaultValue }) => {
  const handlePlaceSelect = useCallback(
    (_: any, details: GooglePlaceDetail | null = null) => {
      onSelect(details);
    },
    [onSelect]
  );

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a place"
        onPress={handlePlaceSelect}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: "fil",
          components: "country:ph",
        }}
        fetchDetails
        enablePoweredByContainer={false}
        textInputProps={{
          defaultValue,
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
          row: styles.row,
          separator: styles.separator,
          description: styles.description,
        }}
        minLength={2}
        debounce={300}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
});

AddressSearch.displayName = "AddressSearch";

export default AddressSearch;
