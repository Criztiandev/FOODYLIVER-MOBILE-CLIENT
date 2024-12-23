import { PrivateAxios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { useState } from "react";

const useFetchOrdersById = (status: any, UID: string) => {
  const [credentials, setCredentials] = useState([]);
  const mutation = useMutation({
    mutationKey: [`/GET /orders/pending/${UID}`],
    mutationFn: async (value: any) => {
      const result = await PrivateAxios.post(`/orders/${status}`, value);

      if (result instanceof AxiosError) {
        throw new Error(result.message);
      }

      return result.data?.data;
    },

    onSuccess: (data) => {
      if (data instanceof AxiosError) {
        throw new Error(data.message);
      }

      setCredentials(data);
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }

      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    },
  });

  return { ...mutation, credentials };
};

export default useFetchOrdersById;
