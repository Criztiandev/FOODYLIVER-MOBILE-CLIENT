import { LoginValue } from "@/interface/auth.interface";
import { LoginValidation } from "@/service/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useLogin = () => {
  const form = useForm<LoginValue>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginValidation),
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: async () => {},
    mutationKey: ["login-mutation"],

    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return { form, mutation };
};

export default useLogin;
