import useMutate from "../query/useMutate";
import { PrivateAxios } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutate({
    mutationKey: ["DELETE /logout"],
    mutationFn: () => PrivateAxios.delete("/"),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export default useLogout;
