import useFetch from "../query/useFetch";
import { PrivateAxios } from "@/lib/axios";

export const useFetchProductList = () => {
  return useFetch({
    queryKey: ["/GET menu-items"],
    queryFn: async () => {
      const result = await PrivateAxios.get("/menu-items");
      return result.data;
    },
  });
};

export const useFetchProductById = (id: string) => {
  return useFetch({
    queryKey: [`/GET menu-items/${id}`],
    queryFn: async () => {
      const result = await PrivateAxios.get(`/menu-items/${id}`);
      return result.data;
    },
  });
};
