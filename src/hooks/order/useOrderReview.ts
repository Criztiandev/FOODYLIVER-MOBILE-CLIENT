import { PrivateAxios } from "@/lib/axios";
import useAccountStore from "@/state/useAccountStore";
import { useQuery } from "@tanstack/react-query";

const useOrderReview = () => {
  const { getCredentials } = useAccountStore();
  return useQuery({
    queryKey: ["/GET /order/review"],
    queryFn: async () => {
      const { data: result } = await PrivateAxios.get(`order-reviews`);
      return result.data;
    },
  });
};

export default useOrderReview;
