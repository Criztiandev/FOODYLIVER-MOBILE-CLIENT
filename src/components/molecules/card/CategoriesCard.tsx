import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import BackgroundImageWrapper from "@/components/organism/other/BackgroundImageWrapper";

interface Categories {
  id: string;
  name: string;
  thumbnail: string;
}

interface Props extends Categories {}

const CategoriesCard = ({ id, name, thumbnail }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/product/list/${id}`)}
    >
      <BackgroundImageWrapper
        thumbnail={thumbnail}
        style={styles.imageBackground}
      >
        {/* Dark overlay */}
        <View style={styles.overlay} />

        {/* Text content */}
        <Text style={styles.text}>{name}</Text>
      </BackgroundImageWrapper>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    height: 100,
    width: 200,
    marginRight: 8,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    zIndex: 1,
  },
});

export default CategoriesCard;
