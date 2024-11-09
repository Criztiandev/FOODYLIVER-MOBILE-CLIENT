import useMutate from "../query/useMutate";
import { PrivateAxios } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import useLocalStorage from "../utils/useLocalStorage";

const useLogout = () => {
  const router = useRouter();
  const { removeItem } = useLocalStorage();
  const queryClient = useQueryClient();
  return useMutate({
    mutationKey: ["POST /logout"],
    mutationFn: () => PrivateAxios.post("/logout"),
    onSuccess: (data) => {
      removeItem("user");
      removeItem("accessToken");

      router.dismissAll();
      queryClient.removeQueries();
      router.replace("/auth/sign-in");
    },

    onError: (e) => {
      console.log(e);
    },
  });
};

export default useLogout;
