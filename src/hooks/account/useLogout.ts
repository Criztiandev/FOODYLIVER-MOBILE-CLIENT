import useMutate from "../query/useMutate";
import { PrivateAxios } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import useLocalStorage from "../utils/useLocalStorage";
import useCartStore from "@/state/useCartStore";

const useLogout = () => {
  const router = useRouter();
  const { removeItem } = useLocalStorage();
  const queryClient = useQueryClient();
  const { clearCart } = useCartStore();
  return useMutate({
    mutationKey: ["POST /logout"],
    mutationFn: async () => {
      return true;
    },
    onSuccess: (data) => {
      removeItem("user");
      removeItem("accessToken");

      clearCart();
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
