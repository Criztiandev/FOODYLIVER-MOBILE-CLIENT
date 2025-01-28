import { PrivateAxios } from "@/lib/axios";
import useFetch from "../query/useFetch";

export const useFetchOrderByTransactionID = (
  customerID: string,
  transactionID: string
) => {
  return useFetch({
    queryKey: [`/GET /order/customer/${customerID}/${transactionID}`],
    queryFn: async () => {
      const result = await PrivateAxios.get(
        `/order/customer/${customerID}/${transactionID}`
      );

      console.log(result.data);

      return result.data;
    },
  });
};

export default useFetchOrderByTransactionID;
