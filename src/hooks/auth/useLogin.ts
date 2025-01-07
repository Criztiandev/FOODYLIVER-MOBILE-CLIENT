import { LoginResponse, LoginValue } from "@/interface/auth.interface";
import { PublicAxios } from "@/lib/axios";
import { LoginValidation } from "@/service/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useMutate from "../query/useMutate";
import useLocalStorage from "../utils/useLocalStorage";
import useAccountStore from "@/state/useAccountStore";
import { useRouter } from "expo-router";

const useLogin = () => {
  const { setItem, removeItem } = useLocalStorage();
  const { setCredentials } = useAccountStore();
  const router = useRouter();

  const form = useForm<LoginValue>({
    // defaultValues: { email: "criztian@gmail.com", password: "password" },
    resolver: zodResolver(LoginValidation),
  });

  // Mutation
  const mutation = useMutate<LoginResponse, any, LoginValue>({
    mutationFn: async (value: LoginValue) => {
      const result = await PublicAxios.post("/login", value);
      return result.data;
    },
    mutationKey: ["POST /login"],

    onSuccess: (data: LoginResponse) => {
      const { token, ...rest } = data;

      setItem("accessToken", token);
      setItem("user", rest);
      setCredentials({ ...rest });
      router.push("/user/(tab)/home");
    },
  });

  return { form, mutation };
};

export default useLogin;
