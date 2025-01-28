import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { ReceiptText, Truck, Coins, Wallet } from "lucide-react-native";
import useCartStore from "@/state/useCartStore";

const SHIPPING_FEE = 25;

const PaymentCheckoutDetails = ({
  paymentMethod,
}: {
  paymentMethod: string;
}) => {
  const { calculateSubtotal } = useCartStore();

  const calculatedTotal = useMemo(() => {
    return calculateSubtotal() + (paymentMethod === "COD" ? SHIPPING_FEE : 0);
  }, [paymentMethod]);

  return (
    <YStack style={styles.container}>
      <XStack style={styles.headerContainer}>
        <ReceiptText color="#F4891F" />
        <Text style={styles.headerText}>Order Summary</Text>
      </XStack>

      <View style={styles.summaryContainer}>
        {paymentMethod === "COD" && (
          <XStack style={styles.summaryRow}>
            <XStack style={styles.leftContent}>
              <Truck color="#F4891F" size={18} />
              <Text style={styles.labelText}>Shipping Fee</Text>
            </XStack>
            <Text style={styles.valueText}>₱ {SHIPPING_FEE}</Text>
          </XStack>
        )}

        <XStack style={styles.summaryRow}>
          <XStack style={styles.leftContent}>
            <Coins color="#F4891F" size={18} />
            <Text style={styles.labelText}>Sub Total</Text>
          </XStack>
          <Text style={styles.valueText}>₱ {calculateSubtotal()}</Text>
        </XStack>

        <XStack style={styles.summaryRow}>
          <XStack style={styles.leftContent}>
            <Wallet color="#F4891F" size={18} />
            <Text style={styles.labelText}>Total</Text>
          </XStack>
          <Text style={styles.valueText}>₱ {calculatedTotal}</Text>
        </XStack>
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "rgba(244, 137, 31, 0.7)",
    padding: 8,
    borderRadius: 6,
    gap: 8,
  },
  headerContainer: {
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
  },
  summaryContainer: {
    marginBottom: 8,
    gap: 8,
  },
  summaryRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    alignItems: "center",
    gap: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
});

export default PaymentCheckoutDetails;
