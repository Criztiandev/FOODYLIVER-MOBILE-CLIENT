import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import useFetchOrderByTransactionID from "@/hooks/order/useFetchOrderByTransactionID";
import { ReceiptText, Truck, Coins, Wallet } from "lucide-react-native";
import useAccountStore from "@/state/useAccountStore";

const OrderHistoryCard = ({
  customer_id,
  transaction_id,
  latest_order_date,
  status,
  order_status,
}: any) => {
  const { credentials } = useAccountStore();

  const { isLoading, data: result } = useFetchOrderByTransactionID(
    customer_id,
    transaction_id
  );

  const assignedDate = new Date(latest_order_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const router = useRouter();

  const orderDetails = useMemo(() => {
    return result?.[0]
      ? {
          ...result[0],
          totalAmount: result[0].total_amount + result[0].delivery_fee,
        }
      : null;
  }, [result]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#F4891F" size="large" />
      </View>
    );
  }

  if (!orderDetails) {
    return null;
  }

  const handleViewDetails = () => {
    router.push(
      `/order/forced/details/${transaction_id}?customer_id=${customer_id}&status=${order_status}` as any
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <XStack style={styles.headerContent}>
          <ReceiptText color="#F4891F" size={24} />
          <Text style={styles.orderNumber}>Order #{transaction_id}</Text>
        </XStack>
      </View>

      <View style={styles.content}>
        <YStack style={styles.detailsContainer}>
          <XStack style={styles.row}>
            <XStack style={styles.iconRow}>
              <Truck color="#F4891F" size={20} />
              <Text style={styles.label}>Name</Text>
            </XStack>
            <Text style={styles.value}>{orderDetails?.customer?.name}</Text>
          </XStack>
          <XStack style={styles.row}>
            <Text style={styles.label}>Ordered At</Text>
            <Text style={styles.value}>{assignedDate}</Text>
          </XStack>

          {orderDetails?.delivery_fee && (
            <XStack style={styles.row}>
              <XStack style={styles.iconRow}>
                <Truck color="#F4891F" size={20} />
                <Text style={styles.label}>Delivery Fee</Text>
              </XStack>
              <Text style={styles.value}>₱ {orderDetails?.delivery_fee}</Text>
            </XStack>
          )}

          {orderDetails?.payment_method && (
            <XStack style={styles.row}>
              <XStack style={styles.iconRow}>
                <Wallet color="#F4891F" size={20} />
                <Text style={styles.label}>Payment Method</Text>
              </XStack>
              <Text style={[styles.value, styles.methodText]}>
                {orderDetails?.payment_method}
              </Text>
            </XStack>
          )}

          {orderDetails?.total_amount && (
            <XStack style={styles.row}>
              <XStack style={styles.iconRow}>
                <Coins color="#F4891F" size={20} />
                <Text style={styles.label}>Sub Total</Text>
              </XStack>
              <Text style={styles.value}>
                ₱ {orderDetails?.total_amount - orderDetails?.delivery_fee}
              </Text>
            </XStack>
          )}

          {orderDetails?.totalAmount && (
            <XStack style={styles.row}>
              <XStack style={styles.iconRow}>
                <Coins color="#F4891F" size={20} />
                <Text style={styles.label}>Total Amount</Text>
              </XStack>
              <Text style={styles.value}>
                ₱ {orderDetails?.totalAmount - orderDetails?.delivery_fee}
              </Text>
            </XStack>
          )}

          <View style={styles.statusContainer}>
            <XStack style={styles.row}>
              <Text style={styles.statusLabel}>Status</Text>
              <Text style={styles.statusValue}>{status}</Text>
            </XStack>
          </View>
        </YStack>

        <View style={styles.buttonContainer}>
          <Button style={styles.detailsButton} onPress={handleViewDetails}>
            <Text style={styles.buttonText}>View Details</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  loadingContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 16,
    backgroundColor: "rgba(244, 137, 31, 0.1)",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerContent: {
    alignItems: "center",
    gap: 8,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    flex: 1,
  },
  content: {
    padding: 16,
  },
  detailsContainer: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#6b7280",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F4891F",
  },
  methodText: {
    color: "#1f2937",
  },
  statusContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4b5563",
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F4891F",
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  detailsButton: {
    backgroundColor: "#F4891F",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OrderHistoryCard;
