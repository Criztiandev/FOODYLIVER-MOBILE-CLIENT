import { View } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/atoms/button/BackButton";
import { WebView, WebViewNavigation } from "react-native-webview";
import useCartStore from "@/state/useCartStore";
import Toast from "react-native-toast-message";
import useAccountStore from "@/state/useAccountStore";
import { User } from "@/interface/user.interface";
import { useGcashOrderMutation } from "@/hooks/product/mutation";
import LoadingScreen from "@/layout/screen/LoadingScreen";

const DRIVER_ID = 3;
const DEFAULT_DELIVERY_TIME = "11:00 AM";
const DELIVERY_FEE = 50;

const RootScreen: React.FC = () => {
  const router = useRouter();
  const { id: url } = useLocalSearchParams();
  const { items } = useCartStore();
  const webViewRef = useRef<WebView | null>(null);
  const { getCredentials } = useAccountStore();
  const { isPending, mutate } = useGcashOrderMutation();
  const hasProcessedPayment = useRef(false);

  const createBaseOrderPayload = async () => {
    const credentials = (await getCredentials()) as User;

    return items.map((product) => ({
      item_id: product.id,
      driver_id: DRIVER_ID,
      customer_id: credentials.user_id,
      transaction_id: null,
      delivery_fee: DELIVERY_FEE,
      total_amount: product.price,
      quantity: product.quantity,
      delivery_date: new Date(),
      delivery_time: DEFAULT_DELIVERY_TIME,
      is_order_accepted_by_driver: false,
      status: "PENDING",
    }));
  };

  const createOrderPayload = useCallback(
    async (transactionID: string) => {
      const basePayload = await createBaseOrderPayload();
      const ordersWithPaymentInfo = basePayload.map((order) => ({
        ...order,
        payment_method: "GCASH",
        order_type: "HOME DELIVERY",
      }));

      if (items.length > 1) {
        return ordersWithPaymentInfo.map((item) => ({
          ...item,
          transaction_id: transactionID,
        }));
      }

      return {
        ...ordersWithPaymentInfo[0],
        transaction_id: transactionID,
      };
    },
    [items, getCredentials]
  );

  const handleNavigationStateChange = async (navState: WebViewNavigation) => {
    console.log("Current URL:", navState.url);

    if (navState.url.includes("success") && !hasProcessedPayment.current) {
      hasProcessedPayment.current = true;
      const url = new URL(navState.url);
      const transactionID = url.searchParams.get("transaction_id");

      if (!transactionID) {
        Toast.show({
          type: "error",
          text1: "Payment Error",
          text2: "Transaction ID not found",
          position: "bottom",
        });
        return;
      }

      try {
        const transformedPayload = await createOrderPayload(transactionID);
        mutate(transformedPayload as any);
      } catch (error) {
        console.error("Error processing payment:", error);
        Toast.show({
          type: "error",
          text1: "Payment Processing Error",
          text2: "Please contact support",
          position: "bottom",
        });
      }
    } else if (navState.url.includes("failed")) {
      Toast.show({
        type: "error",
        text1: "Payment Failed",
        position: "bottom",
      });
    }
  };

  const handleError = (syntheticEvent: any): void => {
    const { nativeEvent } = syntheticEvent;
    console.warn("WebView error:", nativeEvent);
    Toast.show({
      type: "error",
      text1: "Error loading payment page",
      text2: "Please try again",
      position: "bottom",
    });
  };

  const decodedUrl = useMemo(() => {
    if (!url) return "";
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
          onNavigationStateChange={handleNavigationStateChange}
          onError={handleError}
          onLoadStart={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.log("Loading started:", nativeEvent.url);
          }}
          onLoadEnd={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.log("Loading finished:", nativeEvent.url);
          }}
        />
      </View>
    </>
  );
};

export default RootScreen;
