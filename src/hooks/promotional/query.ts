import useFetch from "../query/useFetch";
import { PrivateAxios } from "@/lib/axios";

export const useFetchPromotional = () => {
  return useFetch({
    queryKey: ["/GET categories"],
    queryFn: async () => {
      const result = await PrivateAxios.get("/promotional");

      return result.data;
    },
  });
};
