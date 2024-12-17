import { PrivateAxios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { useState } from "react";

const useFetchOrdersById = (status: string, UID: string) => {
  const [credentials, setCredentials] = useState(null);
  return useMutation({
    mutationKey: [`/GET /orders/pending/${UID}`],
    mutationFn: async (value: any) => {
      const result = await PrivateAxios.post(`/orders/pending`, value);

      if (result instanceof AxiosError) {
        console.log(result.response);
        throw new Error(result.message);
      }

      return result.data;
    },

    onSuccess: (data) => {
      if (data instanceof AxiosError) {
        console.log(data.response);
        throw new Error(data.message);
      }

      console.log(data);
      setCredentials(data);
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error.response);
        throw new Error(error.message);
      }

      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    },
  });
};

export default useFetchOrdersById;
