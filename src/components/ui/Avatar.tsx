import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image, ImageProps } from "expo-image";

interface AvatarProps extends ImageProps {
  fallback?: string;
  size?: number;
  style?: any;
  imageStyle?: any;
}

const Avatar = ({
  fallback = "",
  size = 64,
  style,
  imageStyle,
  ...props
}: AvatarProps) => {
  const [imageFailed, setImageFailed] = React.useState(false);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {imageFailed ? (
        <View style={styles.fallbackContainer}>
          <Text style={[styles.fallbackText, { fontSize: size * 0.3 }]}>?</Text>
        </View>
      ) : (
        <Image
          {...props}
          style={[styles.image, imageStyle]}
          contentFit="cover"
          transition={1000}
          onError={() => setImageFailed(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#d1d5db", // gray-300
    borderRadius: 9999, // rounded-full
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e2e8f0", // bg-slate-200
  },
  fallbackText: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Avatar;
