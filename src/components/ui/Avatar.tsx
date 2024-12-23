import { View, Text } from "react-native";
import React from "react";
import { Image, ImageProps } from "expo-image";
import { cn } from "@/lib/utils";

interface AvatarProps extends ImageProps {
  fallback?: string;
  size?: number;
  imageClass?: string;
}

const Avatar = ({
  fallback = "",
  size = 64,
  className,
  imageClass,
  ...props
}: AvatarProps) => {
  const [imageFailed, setImageFailed] = React.useState(false);

  return (
    <View
      className={cn(
        "border border-gray-300 rounded-full overflow-hidden justify-center items-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      {imageFailed ? (
        <View className="w-full h-full justify-center items-center bg-slate-200">
          <Text className="font-bold" style={{ fontSize: size * 0.3 }}>
            ?
          </Text>
        </View>
      ) : (
        <Image
          {...props}
          className={cn("w-full h-full", imageClass)}
          contentFit="cover"
          transition={1000}
          onError={() => setImageFailed(true)}
        />
      )}
    </View>
  );
};

export default Avatar;
