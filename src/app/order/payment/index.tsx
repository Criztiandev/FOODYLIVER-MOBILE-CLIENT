import BackButton from "@/components/atoms/button/BackButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import { router, Stack } from "expo-router";
import { ShoppingBag, Truck, Wallet } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
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
import Checkbox from "@/components/ui/Checkbox";
import SelectField from "@/components/form/SelectField";
import InputField from "@/components/form/InputField";

// Constants
const PAYMENT_CONSTANTS = {
  DRIVER_ID: 3,
  DEFAULT_DELIVERY_TIME: "11:00 AM",
  DELIVERY_FEE: 50,
} as const;

const PAYMENT_METHODS = [
  { id: 0, title: "Cash on delivery", keyword: "COD" },
  { id: 1, title: "G Cash", keyword: "gcash" },
] as const;

const HEADER_OPTIONS = {
  headerLeft: () => <BackButton />,
  title: "Payment",
  headerTitleStyle: { color: "white" },
  headerStyle: { backgroundColor: "#f4891f" },
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
  delivery_date: Date;
  is_order_accepted_by_driver: boolean;
  status: string;
  payment_method: PaymentMethodKeyword;
  order_type: string;
}

// Components
const PaymentMethodButton = ({
  keyword,
  title,
  isSelected,
  onPress,
}: PaymentMethod & {
  isSelected: boolean;
  onPress: () => void;
}) => (
  <Button
    variant={isSelected ? "default" : "outline"}
    className="space-x-2 flex-row border-stone-400 ml-2"
    onPress={onPress}
  >
    <Truck color={isSelected ? "white" : "#F4891F"} />
    <Text
      className={`text-base font-semibold ${
        isSelected ? "text-white" : "text-primary"
      }`}
    >
      {title}
    </Text>
  </Button>
);

// Main Component
const PaymentScreen = () => {
  // Hooks
  const form = useForm();
  const { items } = useCartStore();
  const { getCredentials } = useAccountStore();

  // State
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodKeyword>("COD");
  const [isDeliveredAtSchool, setIsDeliveredAtSchool] = useState(false);

  // Mutations
  const { mutate: cashOnDeliveryMutate, isPending: codIsPending } =
    useCashOnDeliveryMutation();
  const { mutate: gcashMutate, isPending: gcashIsPending } = useGCashMutation(
    getCredentials as any
  );

  // Memoized Values
  const createOrderPayload = useMemo(async () => {
    const credentials = (await getCredentials()) as User;

    const basePayload = items.map(
      (product): OrderPayload => ({
        item_id: product.id || "",
        driver_id: PAYMENT_CONSTANTS.DRIVER_ID,
        customer_id: credentials.user_id,
        transaction_id: null,
        delivery_fee: PAYMENT_CONSTANTS.DELIVERY_FEE,
        total_amount: product.price,
        quantity: product.quantity,
        delivery_date: new Date(),
        delivery_time: PAYMENT_CONSTANTS.DEFAULT_DELIVERY_TIME,
        is_order_accepted_by_driver: false,
        status: "PENDING",
        payment_method: selectedPaymentMethod,
        order_type: selectedPaymentMethod,
      })
    );

    return basePayload;
  }, [items, selectedPaymentMethod, getCredentials]);

  // Handlers
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

  // Render Methods
  const renderPaymentMethods = () => (
    <XStack className="space-x-">
      {PAYMENT_METHODS.map((method) => (
        <PaymentMethodButton
          key={method.keyword}
          {...method}
          isSelected={selectedPaymentMethod === method.keyword}
          onPress={() => setSelectedPaymentMethod(method.keyword)}
        />
      ))}
    </XStack>
  );

  return (
    <>
      <Stack.Screen options={HEADER_OPTIONS} />

      <BaseLayout>
        <ScrollView>
          <FormProvider {...form}>
            <YStack className="p-4 space-y-4">
              {/* Location Section */}
              <YStack className="space-y-1">
                <PaymentMap />

                <YStack className="mt-2">
                  {isDeliveredAtSchool && (
                    <SelectField
                      label="Department Building"
                      name="building"
                      placeholder="Select Department"
                      options={[
                        { label: "Department of Agriculture", value: "agri" },
                      ]}
                    />
                  )}
                </YStack>

                <XStack className="space-x-2">
                  <Checkbox
                    value={isDeliveredAtSchool}
                    onValueChange={(e) => setIsDeliveredAtSchool(e)}
                  />
                  <Text className="text-md">Deliver at School</Text>
                </XStack>
              </YStack>

              {/* Payment Method Section */}
              <YStack className="space-y-4">
                <XStack className="items-center space-x-2">
                  <Wallet color="#F4891F" />
                  <Text className="text-lg font-bold">Payment Method</Text>
                </XStack>
                {renderPaymentMethods()}
              </YStack>
            </YStack>
          </FormProvider>

          {/* Checkout Section */}
          <View className="p-4 space-y-4">
            <PaymentCheckoutDetails />
            <Button
              onPress={handlePlaceOrder}
              disabled={codIsPending || gcashIsPending}
            >
              <XStack className="space-x-2 items-center">
                <ShoppingBag color="white" size={18} />
                <Text className="text-lg font-semibold text-white">
                  Place order
                </Text>
              </XStack>
            </Button>
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default PaymentScreen;
