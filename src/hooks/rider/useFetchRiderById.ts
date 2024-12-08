import { PrivateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchRiderById = (transactionId: string, riderId: string) => {
  return useQuery({
    queryKey: [`/GET /order/driver/lists/${transactionId}/${riderId}`],
    queryFn: async () => {
      const result = await PrivateAxios.get(
        `/order/driver/lists/${transactionId}/${riderId}`
      );
      return result.data;
    },
    enabled: !!riderId, // Only run when both IDs are available
  });
};
