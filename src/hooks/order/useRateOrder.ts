import { PrivateAxios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import useAccountStore from "@/state/useAccountStore";
import { router } from "expo-router";

interface RatingData {
  transaction_id: string;
  rating: number;
  comment?: string;
}

const useRateOrder = () => {
  const { getCredentials } = useAccountStore();

  const mutation = useMutation({
    mutationKey: ["/POST /order-reviews"],
    mutationFn: async (data: RatingData) => {
      const credentials = await getCredentials();

      const payload = {
        ...data,
        customer_id: (credentials as any)?.user_id,
      };

      const result = await PrivateAxios.post(`order-reviews`, payload);
      return result.data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);

        Toast.show({
          type: "error",
          text1: error.response?.data?.message || "Failed to submit rating",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      }
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Rating submitted successfully",
      });

      router.back();
    },
  });

  return mutation;
};

export default useRateOrder;
