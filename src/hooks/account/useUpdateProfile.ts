import { User } from "@/interface/user.interface";
import { PrivateAxios } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAccountStore from "@/state/useAccountStore";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

const useUpdateProfile = () => {
  const { getCredentials } = useAccountStore();
  return useMutation({
    mutationKey: ["/GET /accout/update/profile"],
    mutationFn: async (value) => {
      const credentials = (await getCredentials()) as User;
      const { data: result } = await PrivateAxios.put(
        `/users/${credentials.user_id}`,
        value
      );
      return result.data;
    },

    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Updated Successfully",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }

      console.log(error);

      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    },
  });
};

export default useUpdateProfile;
