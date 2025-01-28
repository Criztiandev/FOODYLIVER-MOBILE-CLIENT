import BackButton from "@/components/atoms/button/BackButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import { Stack } from "expo-router";
import {
  ShoppingBag,
  Truck,
  Wallet,
  CreditCard,
  UtensilsCrossed,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import PaymentMap from "@/components/molecules/Map/PaymentMap";
import PaymentCheckoutDetails from "@/components/molecules/overview/PaymentCheckoutDetails";
import useCartStore from "@/state/useCartStore";
import {
  useCashOnDeliveryMutation,
  useGCashMutation,
} from "@/hooks/product/mutation";
import useAccountStore from "@/state/useAccountStore";
import { User } from "@/interface/user.interface";
import { FormProvider, useForm } from "react-hook-form";

// Constants
const PAYMENT_CONSTANTS = {
  DRIVER_ID: 3,
  DEFAULT_DELIVERY_TIME: "11:00 AM",
  DELIVERY_FEE: 25,
} as const;

const PAYMENT_METHODS = [
  {
    id: 0,
    title: "Cash on Delivery",
    keyword: "COD",
    description: "Pay with cash when your order arrives",
  },
  {
    id: 1,
    title: "GCash",
    keyword: "gcash",
    description: "Pay securely using GCash",
  },
  {
    id: 2,
    title: "Dine In",
    keyword: "dine_in",
    description: "Pay with cash at the restaurant",
  },
] as const;

const HEADER_OPTIONS = {
  headerLeft: () => <BackButton />,
  title: "Complete Your Order",
  headerTitleStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  headerStyle: {
    backgroundColor: "#f4891f",
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleAlign: "center" as const,
  headerShadowVisible: false,
};

// Types
type PaymentMethod = (typeof PAYMENT_METHODS)[number];
type PaymentMethodKeyword = PaymentMethod["keyword"];

interface OrderPayload {
  item_id: string;
  driver_id: number;
  customer_id: string;
  transaction_id: null;
  delivery_fee: number;
  total_amount: number;
  quantity: number;
  delivery_time: string;
  delivery_date: string;
  is_order_accepted_by_driver: boolean;
  status: string;
  payment_method: PaymentMethodKeyword;
  order_type: string;
}

// Components
const getPaymentIcon = (keyword: PaymentMethodKeyword, isSelected: boolean) => {
  if (keyword === "COD") {
    return <Truck color={isSelected ? "white" : "#F4891F"} size={24} />;
  } else if (keyword === "gcash") {
    return <CreditCard color={isSelected ? "white" : "#F4891F"} size={24} />;
  } else {
    return (
      <UtensilsCrossed color={isSelected ? "white" : "#F4891F"} size={24} />
    );
  }
};

const PaymentMethodButton = ({
  keyword,
  title,
  description,
  isSelected,
  onPress,
}: PaymentMethod & {
  isSelected: boolean;
  onPress: () => void;
}) => (
  <Button
    variant={isSelected ? "default" : "outline"}
    style={[
      styles.paymentMethodButton,
      isSelected && styles.selectedPaymentMethod,
    ]}
    onPress={onPress}
  >
    <View style={styles.paymentMethodContent}>
      {getPaymentIcon(keyword, isSelected)}
      <View style={styles.paymentMethodTextContainer}>
        <Text
          style={[styles.paymentMethodTitle, isSelected && styles.selectedText]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.paymentMethodDescription,
            isSelected && styles.selectedText,
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  </Button>
);

// Main Component
const PaymentScreen = () => {
  const form = useForm();
  const { items, calculateSubtotal } = useCartStore();
  const { getCredentials } = useAccountStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodKeyword>("COD");

  const { mutate: cashOnDeliveryMutate, isPending: codIsPending } =
    useCashOnDeliveryMutation();
  const { mutate: gcashMutate, isPending: gcashIsPending } = useGCashMutation(
    getCredentials as any
  );

  const createOrderPayload = useMemo(async () => {
    const credentials = (await getCredentials()) as User;
    const currentDate = new Date();
    const localDate = currentDate.toISOString().split("T")[0];

    return items.map(
      (product): OrderPayload => ({
        item_id: product.id ?? "",
        driver_id: PAYMENT_CONSTANTS.DRIVER_ID,
        customer_id: credentials.user_id,
        transaction_id: null,
        delivery_fee:
          selectedPaymentMethod === "COD" ? PAYMENT_CONSTANTS.DELIVERY_FEE : 0,
        total_amount:
          selectedPaymentMethod === "gcash"
            ? calculateSubtotal() / 10 / 2
            : calculateSubtotal(),
        quantity: selectedPaymentMethod === "gcash" ? 1 : product.quantity,
        delivery_date: localDate,
        delivery_time: PAYMENT_CONSTANTS.DEFAULT_DELIVERY_TIME,
        is_order_accepted_by_driver: false,
        status: "PENDING",
        payment_method:
          selectedPaymentMethod === "dine_in" ? "COD" : selectedPaymentMethod,
        order_type:
          selectedPaymentMethod === "dine_in" ? "COD" : selectedPaymentMethod,
      })
    );
  }, [items, selectedPaymentMethod, getCredentials]);

  const handlePlaceOrder = async () => {
    const payload = await createOrderPayload;

    if (selectedPaymentMethod === "gcash") {
      const gcashPayload = payload.map((items) => ({
        ...items,
        order_type: "COD",
        payment_method: "GCASH",
      }));
      gcashMutate(gcashPayload);
      return;
    }

    const finalPayload = payload.length > 1 ? payload : payload[0];
    cashOnDeliveryMutate(finalPayload as any);
  };

  return (
    <>
      <Stack.Screen options={HEADER_OPTIONS as any} />

      <BaseLayout>
        <ScrollView style={styles.scrollView}>
          <FormProvider {...form}>
            <YStack style={styles.formContainer}>
              {/* Delivery Location Section */}
              <YStack style={styles.locationSection}>
                <XStack style={styles.sectionHeader}>
                  <Truck color="#F4891F" size={24} />
                  <Text style={styles.sectionTitle}>Delivery Location</Text>
                </XStack>
                <PaymentMap />
              </YStack>

              {/* Payment Method Section */}
              <YStack style={styles.paymentSection}>
                <XStack style={styles.sectionHeader}>
                  <Wallet color="#F4891F" size={24} />
                  <Text style={styles.sectionTitle}>Choose Payment Method</Text>
                </XStack>

                <YStack style={styles.paymentMethodsContainer}>
                  {PAYMENT_METHODS.map((method, index) => (
                    <PaymentMethodButton
                      key={method.id}
                      {...method}
                      isSelected={selectedPaymentMethod === method.keyword}
                      onPress={() => setSelectedPaymentMethod(method.keyword)}
                    />
                  ))}
                </YStack>
              </YStack>
            </YStack>
          </FormProvider>

          {/* Order Summary Section */}
          <View style={styles.checkoutSection}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <PaymentCheckoutDetails paymentMethod={selectedPaymentMethod} />
            <Button
              onPress={handlePlaceOrder}
              disabled={codIsPending || gcashIsPending}
              style={styles.placeOrderButton}
            >
              <XStack style={styles.placeOrderContent}>
                <ShoppingBag color="white" size={24} />
                <Text style={styles.placeOrderText}>
                  {codIsPending || gcashIsPending
                    ? "Processing..."
                    : "Place Order"}
                </Text>
              </XStack>
            </Button>
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    padding: 16,
    gap: 24,
  },
  sectionHeader: {
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
  },
  locationSection: {
    gap: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  paymentSection: {
    gap: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  paymentMethodsContainer: {
    gap: 12,
  },
  paymentMethodButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#e5e5e5",
    height: 56,
  },
  selectedPaymentMethod: {
    backgroundColor: "#F4891F",
    borderColor: "#F4891F",
  },
  paymentMethodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  paymentMethodTextContainer: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: "#666666",
  },
  selectedText: {
    color: "white",
  },
  checkoutSection: {
    padding: 16,
    gap: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8,
  },
  placeOrderButton: {
    height: 52,
    paddingVertical: 16,
    backgroundColor: "#F4891F",
    borderRadius: 12,
  },
  placeOrderContent: {
    gap: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  placeOrderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
});

export default PaymentScreen;
