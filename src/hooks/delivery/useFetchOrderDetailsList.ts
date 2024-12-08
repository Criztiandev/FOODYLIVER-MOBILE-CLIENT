import { User } from "@/interface/user.interface";
import { PrivateAxios } from "@/lib/axios";
import useAccountStore from "@/state/useAccountStore";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrderDetailsList = (transactionID: string) => {
  const { getCredentials } = useAccountStore();

  return useQuery({
    queryKey: [`/GET order/details/${transactionID}`],
    queryFn: async () => {
      const credentials = (await getCredentials()) as User;

      const result = await PrivateAxios.get(
        `/order/customer/lists/${transactionID}/${credentials?.user_id}`
      );

      return result.data;
    },
  });
};
