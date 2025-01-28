import React from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import {
  Coins,
  MapPin,
  Phone,
  ReceiptText,
  Truck,
  Wallet,
  CheckCircle2,
} from "lucide-react-native";

import HomeButton from "@/components/atoms/button/HomeButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { useFetchOrderDetailsList } from "@/hooks/delivery/useFetchOrderDetailsList";
import { Image } from "expo-image";

// Types
interface OrderSummaryProps {
  orderType: any;
  total_amount: number;
  delivery_fee?: number;
}

interface RiderInfoProps {
  name: string;
  phone: string;
  avatar: string;
  address: string;
}

// Components
const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderType,
  total_amount,
  delivery_fee = 25,
}) => {
  return (
    <View style={styles.summaryContainer}>
      <XStack style={styles.summaryHeader}>
        <ReceiptText color="#F4891F" size={24} />
        <Text style={styles.summaryTitle}>Order Summary</Text>
      </XStack>

      <View style={styles.summaryContent}>
        {orderType === "COD" && (
          <XStack style={styles.summaryRow}>
            <XStack style={styles.iconTextGroup}>
              <Truck color="#F4891F" size={20} />
              <Text style={styles.labelText}>Delivery Fee</Text>
            </XStack>
            <Text style={styles.valueText}>₱ {delivery_fee}</Text>
          </XStack>
        )}

        <XStack style={styles.summaryRow}>
          <XStack style={styles.iconTextGroup}>
            <Coins color="#F4891F" size={20} />
            <Text style={styles.labelText}>Sub Total</Text>
          </XStack>
          <Text style={styles.valueText}>₱ {total_amount}</Text>
        </XStack>

        <View style={styles.totalSection}>
          <XStack style={styles.summaryRow}>
            <XStack style={styles.iconTextGroup}>
              <Wallet color="#F4891F" size={20} />
              <Text style={styles.totalLabel}>Total</Text>
            </XStack>
            <Text style={styles.totalAmount}>₱ {total_amount}</Text>
          </XStack>
        </View>
      </View>
    </View>
  );
};

const RiderInfo: React.FC<RiderInfoProps> = ({
  name,
  phone,
  avatar,
  address,
}) => (
  <View style={styles.riderContainer}>
    <XStack style={styles.riderContent}>
      <Avatar size={80} source={avatar} style={styles.riderAvatar} />
      <YStack style={styles.riderInfo}>
        <Text style={styles.riderName}>{name}</Text>
        <Text style={styles.riderRole}>Rider</Text>
        <XStack style={styles.phoneContainer}>
          <Phone size={16} color="white" />
          <Text style={styles.phoneText}>{phone || "N/A"}</Text>
        </XStack>
        <Text style={styles.addressText}>{address}</Text>
      </YStack>
    </XStack>
  </View>
);

const DeliveryStatus: React.FC<{ status: string }> = ({ status }) => (
  <View style={styles.statusContainer}>
    <XStack style={styles.statusContent}>
      <XStack style={styles.statusLeft}>
        <CheckCircle2 color="#22C55E" size={24} />
        <YStack>
          <Text style={styles.statusTitle}>Order Status</Text>
          <Text style={styles.statusText}>{status}</Text>
        </YStack>
      </XStack>
      <Truck color="#F4891F" size={24} />
    </XStack>
  </View>
);

const RootScreen = () => {
  const { transaction_id } = useLocalSearchParams();
  const router = useRouter();

  const orderQry = useFetchOrderDetailsList(transaction_id as string);
  if (orderQry.isLoading) return <LoadingScreen />;

  if (orderQry.isError) {
    console.error("Order Error:", orderQry.error);
    return <ErrorScreen />;
  }

  const selectedOrderDetails = orderQry.data.find(
    (items: any) => items.transaction_id === transaction_id
  );

  const handleCallRider = async () => {
    if (!selectedOrderDetails?.rider?.phone_number) {
      Alert.alert("Error", "Rider phone number not available");
      return;
    }

    try {
      await Linking.openURL(`tel:${selectedOrderDetails?.rider?.phone_number}`);
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to make phone call. Please try again later."
      );
    }
  };

  console.log(orderQry.data);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <HomeButton />,
          title: "Delivery Details",
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <BaseLayout>
        <View style={styles.container}>
          {selectedOrderDetails?.rider && (
            <RiderInfo
              name={selectedOrderDetails?.rider?.name}
              phone={selectedOrderDetails?.rider?.phone}
              address={selectedOrderDetails?.rider?.address}
              avatar={require("@/assets/images/girl-user.png")}
            />
          )}

          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/order-delivered.png")}
                style={styles.deliveryImage}
                contentFit="cover"
              />
              <View style={styles.successMessageContainer}>
                <Text style={styles.successMessage}>
                  Your order has been placed!
                </Text>
              </View>
            </View>

            <DeliveryStatus status={selectedOrderDetails?.status} />
            <OrderSummary
              orderType={selectedOrderDetails?.order_type}
              delivery_fee={Number(selectedOrderDetails?.delivery_fee) || 0}
              total_amount={Number(selectedOrderDetails?.total_amount) || 0}
            />

            <View style={styles.buttonContainer}>
              {selectedOrderDetails?.rider &&
                selectedOrderDetails?.status === "ONGOING" && (
                  <Button
                    onPress={() =>
                      router.replace(`/order/track/${transaction_id}`)
                    }
                    style={styles.trackButton}
                    accessibilityLabel="Track Order"
                  >
                    <XStack style={styles.buttonContent}>
                      <MapPin color="white" size={24} />
                      <Text style={styles.buttonText}>Track Order</Text>
                    </XStack>
                  </Button>
                )}
              {selectedOrderDetails?.rider &&
                selectedOrderDetails?.status === "ONGOING" && (
                  <Button
                    variant="outline"
                    style={styles.callButton}
                    onPress={handleCallRider}
                    accessibilityLabel="Call Rider"
                  >
                    <XStack style={styles.buttonContent}>
                      <Phone color="#F4891F" size={24} />
                      <Text style={styles.callButtonText}>Call Rider</Text>
                    </XStack>
                  </Button>
                )}
            </View>
          </View>
        </View>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#f4891f",
  },
  headerTitle: {
    color: "white",
  },
  contentContainer: {
    padding: 16,
    flex: 1,
  },
  summaryContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  summaryHeader: {
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 8,
  },
  summaryContent: {
    gap: 16,
  },
  summaryRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconTextGroup: {
    alignItems: "center",
    gap: 12,
  },
  labelText: {
    fontSize: 16,
    color: "#4b5563",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f4891f",
  },
  riderContainer: {
    backgroundColor: "#f4891f",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(244, 137, 31, 0.3)",
  },
  riderContent: {
    alignItems: "center",
    gap: 16,
  },
  riderAvatar: {
    borderWidth: 2,
    borderColor: "white",
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  riderRole: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  phoneContainer: {
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  phoneText: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  addressText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 4,
  },
  statusContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statusContent: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLeft: {
    alignItems: "center",
    gap: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  statusText: {
    color: "#f4891f",
    fontWeight: "600",
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  deliveryImage: {
    height: 200,
    width: "100%",
  },
  successMessageContainer: {
    padding: 16,
    backgroundColor: "rgba(244, 137, 31, 0.1)",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  successMessage: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: "#f4891f",
  },
  buttonContainer: {
    gap: 12,
    marginTop: "auto",
  },
  trackButton: {
    backgroundColor: "#f4891f",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#f4891f",
  },
  callButton: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    paddingVertical: 16,
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  callButtonText: {
    fontSize: 18,
    color: "#f4891f",
    fontWeight: "bold",
  },
});

export default RootScreen;
