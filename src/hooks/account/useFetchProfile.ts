import { User } from "@/interface/user.interface";
import { PrivateAxios } from "@/lib/axios";
import useAccountStore from "@/state/useAccountStore";
import { useQuery } from "@tanstack/react-query";

const useFetchProfile = () => {
  const { getCredentials } = useAccountStore();
  return useQuery({
    queryKey: ["/GET /accout/profile"],
    queryFn: async () => {
      const credentials = (await getCredentials()) as User;
      const { data: result } = await PrivateAxios.get(
        `/users/${credentials.user_id}`
      );
      return result.data;
    },
  });
};

export default useFetchProfile;
