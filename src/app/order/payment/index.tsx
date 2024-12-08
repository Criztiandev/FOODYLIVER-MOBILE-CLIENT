import BackButton from "@/components/atoms/button/BackButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import { router, Stack } from "expo-router";
import { ShoppingBag, Truck, Wallet } from "lucide-react-native";
import React, { useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import PaymentMap from "@/components/molecules/Map/PaymentMap";
import PaymentCheckoutDetails from "@/components/molecules/overview/PaymentCheckoutDetails";
import useCartStore from "@/state/useCartStore";
import {
  useCashOnDeliveryMutation,
  useGCashMutation,
} from "@/hooks/product/mutation";
import useAccountStore from "@/state/useAccountStore";
import { User } from "@/interface/user.interface";

type PaymentMethod = {
  id: number;
  title: string;
  keyword: "COD" | "gcash";
};

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 0, title: "Cash on delivery", keyword: "COD" },
  { id: 1, title: "G Cash", keyword: "gcash" },
] as const;

const DRIVER_ID = 3;
const DEFAULT_DELIVERY_TIME = "11:00 AM";
const DELIVERY_FEE = 50;

const headerOptions = {
  headerLeft: () => <BackButton />,
  title: "Payment",
  headerTitleStyle: { color: "white" },
  headerStyle: { backgroundColor: "#f4891f" },
  headerTitleAlign: "center" as const,
  headerShadowVisible: false,
};

const RootScreen = () => {
  // State Management
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<PaymentMethod["keyword"]>("COD");
  const { items, clearCart } = useCartStore();
  const { getCredentials } = useAccountStore();

  // Mutations
  const {
    mutate: cashOnDeliveryMutate,
    isPending,
    isSuccess,
  } = useCashOnDeliveryMutation();

  const { mutate: gcashMutate } = useGCashMutation(getCredentials as any);

  // Order Payload Creators
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

  const createOrderPayload = useMemo(async () => {
    const basePayload = await createBaseOrderPayload();
    return basePayload.map((order) => ({
      ...order,
      payment_method: selectedPaymentMethod,
      order_type: selectedPaymentMethod,
    }));
  }, [items, selectedPaymentMethod, getCredentials]);

  // Event Handlers
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
    cashOnDeliveryMutate(payload);
  };

  // Navigation Effect
  useEffect(() => {
    if (isSuccess) {
      clearCart();
      router.push("/order/delivery");
    }
  }, [isSuccess, clearCart]);

  // UI Rendering
  const renderPaymentMethod = ({ keyword, title }: PaymentMethod) => {
    const isSelected = selectedPaymentMethod === keyword;
    return (
      <Button
        key={keyword}
        variant={isSelected ? "default" : "outline"}
        className="space-x-2 flex-row border-stone-400"
        onPress={() => setSelectedPaymentMethod(keyword)}
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
  };

  return (
    <>
      <Stack.Screen options={headerOptions} />

      <BaseLayout>
        <YStack className="p-4 space-y-4">
          <PaymentMap />

          <YStack className="space-y-4">
            <XStack className="items-center space-x-2">
              <Wallet color="#F4891F" />
              <Text className="text-lg font-bold">Payment Method</Text>
            </XStack>

            <XStack className="space-x-4">
              {PAYMENT_METHODS.map(renderPaymentMethod)}
            </XStack>
          </YStack>
        </YStack>
      </BaseLayout>

      <View className="p-4 absolute bottom-0 w-full space-y-4">
        <PaymentCheckoutDetails />
        <Button onPress={handlePlaceOrder} disabled={isPending}>
          <XStack className="space-x-2 items-center">
            <ShoppingBag color="white" size={18} />
            <Text className="text-lg font-semibold text-white">
              Place order
            </Text>
          </XStack>
        </Button>
      </View>
    </>
  );
};

export default RootScreen;
