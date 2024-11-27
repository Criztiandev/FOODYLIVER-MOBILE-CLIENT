import { PrivateAxios } from "@/lib/axios";
import useMutate from "../query/useMutate";
import { AxiosError } from "axios";

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
  is_order_accepted_by_driver: number | null;
  status: string;
}

export const useCashOnDeliveryMutation = () => {
  return useMutate({
    mutationKey: ["cashon-deliver"],
    mutationFn: async (value: CashonDeliverRequest[]) => {
      console.log(value);
      const result = await PrivateAxios.post("/orders", value);
      return result.data;
    },

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const result = error as AxiosError;

      console.log(result.request);
    },
  });
};
