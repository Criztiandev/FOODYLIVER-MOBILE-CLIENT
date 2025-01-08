import { PrivateAxios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const useDeliverOrder = (id: string) => {
  return useMutation({
    mutationKey: [`/POST /order/deliver/${id}`],
    mutationFn: async (value: any) => {
      const result = await PrivateAxios.post(
        `/order/update/status/${value.transaction_id}`,
        value
      );

      if (result instanceof AxiosError) {
        console.log(result.response);
        throw new Error(result.response?.data?.message || result.message);
      }

      return result.data;
    },

    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Order delivered successfully",
      });
      router.push("/user/home");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }

      Toast.show({
        type: "error",
        text1: "Error delivering order",
        text2: error.message,
      });
    },
  });
};

export default useDeliverOrder;
