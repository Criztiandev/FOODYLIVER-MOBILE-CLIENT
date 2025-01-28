import BackButton from "@/components/atoms/button/BackButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import useFetchOrderByTransactionID from "@/hooks/order/useFetchOrderByTransactionID";
import BaseLayout from "@/layout/BaseLayout";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ReceiptText, Truck, Phone, Coins, Wallet } from "lucide-react-native";
import React, { useMemo, useState, useCallback } from "react";
import {
  Text,
  View,
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import Avatar from "@/components/ui/Avatar";

const RootScreen = () => {
  const { customer_id, id: transaction_id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading,
    isError,
    data: result,
    refetch,
  } = useFetchOrderByTransactionID(customer_id as any, transaction_id as any);

  const orderDetails = useMemo(() => {
    return result?.[0];
  }, [result]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <LoadingScreen />;

  const handleCallRider = async () => {
    if (!orderDetails?.rider?.phone_number) {
      Alert.alert("Error", "Rider phone number not available");
      return;
    }

    try {
      await Linking.openURL(`tel:${orderDetails?.rider?.phone_number}`);
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to make phone call. Please try again later."
      );
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          title: "Order History Details",
          headerTitleAlign: "center",
        }}
      />

      <BaseLayout>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orderDetails?.rider && (
            <View style={styles.riderContainer}>
              <XStack style={styles.riderContent}>
                <Avatar
                  size={80}
                  source={require("@/assets/images/girl-user.png")}
                  style={styles.riderAvatar}
                />
                <YStack style={styles.riderInfo}>
                  <Text style={styles.riderName}>
                    {orderDetails.rider.name}
                  </Text>
                  <Text style={styles.riderTitle}>Rider</Text>
                  <XStack style={styles.riderPhone}>
                    <Phone size={16} color="white" />
                    <Text style={styles.riderPhoneText}>
                      {orderDetails.rider.phone_number || "N/A"}
                    </Text>
                  </XStack>
                  <Text style={styles.riderAddress}>
                    {orderDetails.rider.address}
                  </Text>
                </YStack>
              </XStack>
            </View>
          )}

          <View style={styles.contentContainer}>
            <View style={styles.orderImageCard}>
              <Image
                source={require("@/assets/images/order-delivered.png")}
                style={styles.orderImage}
                contentFit="cover"
              />
              <View style={styles.orderTitleContainer}>
                <Text style={styles.orderTitle}>Order Details</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <XStack style={styles.summaryHeader}>
                <ReceiptText color="#F4891F" size={24} />
                <Text style={styles.summaryTitle}>Order Summary</Text>
              </XStack>

              <View style={styles.summaryContent}>
                <XStack style={styles.summaryRow}>
                  <XStack style={styles.summaryLabel}>
                    <Coins color="#F4891F" size={20} />
                    <Text style={styles.summaryText}>Sub Total</Text>
                  </XStack>
                  <Text style={styles.summaryValue}>
                    ₱ {orderDetails.total_amount}
                  </Text>
                </XStack>

                <View style={styles.totalContainer}>
                  <XStack style={styles.summaryRow}>
                    <XStack style={styles.summaryLabel}>
                      <Wallet color="#F4891F" size={20} />
                      <Text style={styles.totalText}>Total</Text>
                    </XStack>
                    <Text style={styles.totalValue}>
                      ₱ {orderDetails.total_amount}
                    </Text>
                  </XStack>
                </View>
              </View>
            </View>

            {orderDetails?.rider && orderDetails?.status === "ONGOING" && (
              <Button
                style={styles.callButton}
                onPress={handleCallRider}
                accessibilityLabel="Call Rider"
              >
                <XStack style={styles.callButtonContent}>
                  <Phone color="#F4891F" size={24} />
                  <Text style={styles.callButtonText}>Call Rider</Text>
                </XStack>
              </Button>
            )}
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  riderContainer: {
    backgroundColor: "#f4891f",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontWeight: "700",
    color: "white",
  },
  riderTitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  riderPhone: {
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  riderPhoneText: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  riderAddress: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 4,
  },
  contentContainer: {
    padding: 16,
    flex: 1,
  },
  orderImageCard: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  orderImage: {
    height: 200,
    width: "100%",
  },
  orderTitleContainer: {
    padding: 16,
    backgroundColor: "rgba(244, 137, 31, 0.1)",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#f4891f",
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  summaryHeader: {
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingBottom: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
  },
  summaryContent: {
    gap: 16,
  },
  summaryRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    alignItems: "center",
    gap: 12,
  },
  summaryText: {
    fontSize: 16,
    color: "#4b5563",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    paddingTop: 8,
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f4891f",
  },
  callButton: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    paddingVertical: 16,
  },
  callButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  callButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f4891f",
  },
});

export default RootScreen;
