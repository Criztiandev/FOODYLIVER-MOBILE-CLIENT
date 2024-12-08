import { View, Text } from "react-native";
import React, { useEffect, useRef, useMemo } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/atoms/button/BackButton";
import Button from "@/components/ui/Button";
import XStack from "@/components/stacks/XStack";
import { ShoppingBag } from "lucide-react-native";
import { WebView } from "react-native-webview";
import useCartStore from "@/state/useCartStore";
import Toast from "react-native-toast-message";

const RootScreen = () => {
  const router = useRouter();
  const { id: url } = useLocalSearchParams();
  const { clearCart } = useCartStore();
  const webViewRef = useRef(null);

  const handlePlaceOrder = () => {
    clearCart();
    router.replace("/order/delivery");
  };

  const decodedUrl = useMemo(() => {
    if (!url) return "";
    // Decode the URL parameter as it might be encoded
    return decodeURIComponent(String(url));
  }, [url]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Gcash Payment",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <View className="flex-1 bg-white">
        <WebView
          ref={webViewRef}
          source={{ uri: decodedUrl }}
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          incognito={true}
          cacheEnabled={false}
          bounces={false}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
        />
      </View>
    </>
  );
};

export default RootScreen;
