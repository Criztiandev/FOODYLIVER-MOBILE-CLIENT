import { PrivateAxios } from "@/lib/axios";
import useFetch from "../query/useFetch";

export const useFetchOrderByRider = (id: string) => {
  return useFetch({
    queryKey: [`/GET /order/driver/lists/${id}`],
    queryFn: async () => {
      const result = await PrivateAxios.get(`/order/driver/lists/${id}`);
      return result.data;
    },
    enabled: !!id,
  });
};
