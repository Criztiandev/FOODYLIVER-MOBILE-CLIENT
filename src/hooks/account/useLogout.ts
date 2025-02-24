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
      try {
        // Clear all local storage items first
        await Promise.all([removeItem("user"), removeItem("accessToken")]);

        // Clear application state
        clearCart();
        queryClient.clear();

        // Navigate after all cleanup is done
        router.replace("/auth/sign-in");

        return true;
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Still try to redirect to login on error
      router.replace("/auth/sign-in");
    },
  });
};

export default useLogout;
