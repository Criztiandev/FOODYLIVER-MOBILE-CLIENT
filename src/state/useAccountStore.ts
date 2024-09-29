import ProtectedRoute from "@/components/routes/ProtectedRoute";
import useMutate from "@/hooks/query/useMutate";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import { AccountStore } from "@/interface/account.interface";
import { User } from "@/interface/user.interface";
import { PrivateAxios } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { create } from "zustand";

const useAccountStore = create<AccountStore>((set, get) => ({
  credentials: null,

  logout: () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    router.dismissAll();
    queryClient.invalidateQueries();

    return;
  },

  getCredentials: () => {
    return;
  },

  setCredentials: (credentials: User) =>
    set((state) => {
      const { setItem } = useLocalStorage();

      if (!credentials) {
        Toast.show({
          type: "error",
          text1: "Something went wrong, Please try again later",
        });
        return state;
      }

      setItem("user", credentials);

      return { credentials };
    }),

  updateCredentials: (credentials: User) =>
    set((state) => {
      const { updateItem } = useLocalStorage();

      if (!credentials) {
        Toast.show({
          type: "error",
          text1: "Something went wrong, Please try again later",
        });
        return state;
      }

      updateItem("user", credentials);

      return { credentials };
    }),

  deleteAccount: () => {
    const state = get();

    const credentials = state.credentials;

    if (!credentials?.id) {
      Toast.show({
        type: "error",
        text1: "Cannot delete, Id is not provided",
      });
      return state;
    }

    return useMutate({
      mutationKey: ["account"],
      mutationFn: async (id: string) =>
        await PrivateAxios.delete(`/account/delete/${id}`),
    });
  },
}));

export default useAccountStore;
