import React, { useState } from "react";
import {
  ImageBackground,
  View,
  ActivityIndicator,
  ImageBackgroundProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface BackgroundImageWrapperProps
  extends Omit<ImageBackgroundProps, "source"> {
  thumbnail: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  loadingIndicatorColor?: string;
  loadingOverlayColor?: string;
}

const BackgroundImageWrapper: React.FC<BackgroundImageWrapperProps> = ({
  thumbnail,
  children,
  style,
  loadingIndicatorColor = "#ffffff",
  loadingOverlayColor = "rgba(0,0,0,0.1)",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <ImageBackground
      resizeMode="cover"
      source={
        hasError
          ? require("@/assets/images/cooking-img.png")
          : { uri: `https://jandbfoodapp.site/storage/${thumbnail}` }
      }
      style={[style, { position: "relative" }]}
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
      onError={() => {
        setHasError(true);
        setIsLoading(false);
      }}
      {...props}
    >
      {children}

      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: loadingOverlayColor,
          }}
        >
          <ActivityIndicator size="large" color={loadingIndicatorColor} />
        </View>
      )}
    </ImageBackground>
  );
};

export default BackgroundImageWrapper;
