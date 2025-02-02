import { ReactNode } from "react";
import useMultiForm from "@/hooks/useMultiForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { PrivateAxios } from "@/lib/axios";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { AxiosError } from "axios";

interface StepsItem {
  component: ReactNode;
  validation: any;
}

interface Props {
  defaultValues: Record<string, any>;
  steps: StepsItem[];
}

const useRegister = ({ defaultValues, steps }: Props) => {
  const multiform = useMultiForm(steps.map((item) => item.component));
  const router = useRouter();
  const form = useForm({
    defaultValues,
    resolver: zodResolver(steps[multiform.currentStep].validation),
  });
  // Mutation
  const mutation = useMutation({
    mutationFn: async (value: any) => {
      try {
        const result = await PrivateAxios.post("/register", value);

        console.log(result);
        return result.data;
      } catch (e) {
        return e;
      }
    },
    mutationKey: ["register-mutation"],

    onSuccess: (data) => {
      if (data instanceof AxiosError) {
        console.log(data.response);
        const { message } = data;

        Toast.show({
          type: "error",
          text1: message,
        });

        return;
      }

      const { message } = data;
      Toast.show({
        type: "success",
        text1: message,
      });

      form.reset();
      router.push("/auth/sign-in");
    },

    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    },
  });

  return { multiform, form, mutation };
};

export default useRegister;
