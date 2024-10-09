import { User } from "@/interface/user.interface";
import useMutate from "../query/useMutate";
import { PrivateAxios } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutate({
    queryKey: ["GET /profile/details"],
    mutationKey: ["Update /profile/update"],
    mutationFn: (value: User) => PrivateAxios.put("/", value),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export default useLogout;
