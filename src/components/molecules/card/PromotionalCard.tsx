import { Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import BackgroundImageWrapper from "@/components/organism/other/BackgroundImageWrapper";

interface PromotionalItem {
  id: string;
  name: string;
  thumbnail: string;
}

interface Props extends PromotionalItem {}

const PromotionalCard: React.FC<Props> = ({ id, name, thumbnail }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.container, { width: Dimensions.get("screen").width - 16 }]}
      onPress={() => router.push(`/product/list/${name}`)}
    >
      <BackgroundImageWrapper
        thumbnail={thumbnail}
        style={styles.imageBackground}
      >
        {/* Gradient overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
        />

        {/* Text content */}
        <Text style={styles.text}>{name[0].toUpperCase() + name.slice(1)}</Text>
      </BackgroundImageWrapper>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    height: 200,
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
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 2,
  },
});

export default PromotionalCard;
