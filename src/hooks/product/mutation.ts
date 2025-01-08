import { PrivateAxios } from "@/lib/axios";
import useMutate from "../query/useMutate";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import useAccountStore from "@/state/useAccountStore";
import { User } from "@/interface/user.interface";
import { router, useRouter } from "expo-router";
import useCartStore from "@/state/useCartStore";

export interface CashonDeliverRequest {
  item_id: number;
  driver_id: number;
  customer_id: number;
  transaction_id: string | null;
  payment_method: string;
  delivery_fee: number;
  total_amount: number;
  quantity: number;
  delivery_date: string;
  delivery_time: string;
  order_type: string;
  is_order_accepted_by_driver: boolean;
  status: string;
}

export const useCashOnDeliveryMutation = () => {
  const { clearCart } = useCartStore();
  const router = useRouter();
  return useMutate({
    mutationKey: ["cashon-deliver"],
    mutationFn: async (values: any[]) => {
      const { data: result } = await PrivateAxios.post("/orders", values);

      return result;
    },
    onSuccess: (data) => {
      const { transaction_id } = data;
      Toast.show({
        type: "success",
        text1: "Orders created successfully",
      });

      clearCart();
      router.replace(`/order/delivery?transaction_id=${transaction_id}`);
    },
    onError: (error: Error, variables: any[], context: unknown) => {
      // Type check if it's an AxiosError
      if (axios.isAxiosError(error)) {
      }

      Toast.show({
        type: "error",
        text1: "Failed to process orders",
      });
    },
  });
};

export const useGCashMutation = (getCredentials: () => Promise<User>) => {
  return useMutate({
    mutationKey: ["gcash-payment"],
    mutationFn: async (values: any[]): Promise<any> => {
      const credentials = await getCredentials();

      const transformedPayload = values.map((items) => ({
        item_id: String(items.item_id),
        quantity: items.quantity,
        price: Math.floor(Number(items.total_amount) * 1000),
      }));

      const finalPayload = {
        name: credentials.name,
        email: credentials.email,
        phone_number: credentials.phone_number,
        items: transformedPayload,
      };
      const response = await PrivateAxios.post(
        "/payments/create",
        finalPayload
      );

      return response.data;
    },
    onSuccess: (data) => {
      const { success, checkout_url } = data;

      if (!checkout_url) {
        Toast.show({
          type: "error",
          text1: "Payment URL not found",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Proceeding to payment",
      });

      const encodedUrl = encodeURIComponent(checkout_url);
      router.replace(`/order/payment/gcash/${encodedUrl}`);
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error("Payment failed:", error.response?.data);
      }

      Toast.show({
        type: "error",
        text1: "Payment processing failed",
      });
    },
  });
};

export const useGcashOrderMutation = () => {
  const { clearCart } = useCartStore();
  return useMutate({
    mutationKey: ["gcash-order"],
    mutationFn: async (values: any[]) => {
      const { data: result } = await PrivateAxios.post("/orders", values);

      return values[0];
    },

    onSuccess: (data) => {
      const { transaction_id } = data;

      Toast.show({
        type: "success",
        text1: "Orders created successfully",
      });

      clearCart();
      router.replace(`/order/delivery?transaction_id=${transaction_id}`);
    },
    onError: (error: Error, variables: any[], context: unknown) => {
      // Type check if it's an AxiosError
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }

      Toast.show({
        type: "error",
        text1: "Failed to process orders",
      });
    },
  });
};
