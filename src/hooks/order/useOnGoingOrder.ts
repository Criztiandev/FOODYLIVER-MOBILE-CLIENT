import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { PrivateAxios } from "@/lib/axios";

interface UpdateOrderStatusPayload {
  transaction_id: string;
  status: "ONGOING" | "DELIVERED" | "PENDING";
}

interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
    updated_at: string;
  };
}

const useOnGoingOrder = (id: string) => {
  return useMutation<OrderResponse, Error, UpdateOrderStatusPayload>({
    mutationKey: [`order-status-update-${id}`],

    mutationFn: async (payload) => {
      try {
        const { data } = await PrivateAxios.post<OrderResponse>(
          `/order/update/status/${payload.transaction_id}`,
          payload
        );
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || error.message);
        }
        throw error;
      }
    },

    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Order status updated successfully",
        text2: `Order is now being delivered`,
      });
    },

    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to update order status",
        text2: error.message,
      });
    },
  });
};

export default useOnGoingOrder;
