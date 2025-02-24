import { View, StyleSheet } from "react-native";
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
const DELIVERY_FEE = 25;

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
    const currentDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

    return items.map((product) => {
      return {
        item_id: product.id,
        driver_id: DRIVER_ID,
        customer_id: credentials.user_id,
        transaction_id: null,
        delivery_fee: DELIVERY_FEE,
        total_amount: product.price,
        quantity: product.quantity,
        delivery_date: currentDate,
        delivery_time: DEFAULT_DELIVERY_TIME,
        is_order_accepted_by_driver: false,
        status: "PENDING",
      };
    });
  };

  const createOrderPayload = useCallback(
    async (transactionID: string) => {
      const basePayload = await createBaseOrderPayload();

      // combine all order price
      const calculatedOverAllTotal = basePayload.reduce(
        (acc, curr) => acc + curr.total_amount * curr.quantity,
        0
      );
      console.log("Calculated Over All Total");
      console.log(calculatedOverAllTotal);

      const ordersWithPaymentInfo = basePayload.map((order) => ({
        ...order,
        total_amount: calculatedOverAllTotal,
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
    // Check for both success and successful in the URL
    const isSuccess =
      navState.url.toLowerCase().includes("success") ||
      navState.url.toLowerCase().includes("successful");

    if (isSuccess && !hasProcessedPayment.current) {
      hasProcessedPayment.current = true;

      try {
        const url = new URL(navState.url);
        let transactionID = url.searchParams.get("transaction_id");

        // If transaction_id not in params, try to extract from URL path
        if (!transactionID) {
          const urlParts = navState.url.split("/");
          transactionID = urlParts[urlParts.length - 1];
        }

        if (!transactionID) {
          throw new Error("Transaction ID not found");
        }

        const transformedPayload = await createOrderPayload(transactionID);

        console.log("\n\n");
        console.log("Transformed Payload");
        console.log(transformedPayload);
        console.log("\n\n");

        mutate(transformedPayload as any);

        Toast.show({
          type: "success",
          text1: "Payment Successful",
          text2: "Your order has been placed",
          position: "bottom",
        });

        // Navigate back to home after successful payment
        // setTimeout(() => {
        //   router.replace("/user/home");
        // }, 2000);
      } catch (error) {
        console.error("Error processing payment:", error);
        Toast.show({
          type: "error",
          text1: "Payment Processing Error",
          text2: "Please contact support",
          position: "bottom",
        });
      }
    } else if (
      navState.url.includes("failed") ||
      navState.url.includes("failure")
    ) {
      Toast.show({
        type: "error",
        text1: "Payment Failed",
        text2: "Please try again",
        position: "bottom",
      });
      // router.back();
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

  if (isPending) {
    return <LoadingScreen />;
  }

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
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: decodedUrl }}
          style={styles.webview}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  webview: {
    flex: 1,
  },
});

export default RootScreen;
