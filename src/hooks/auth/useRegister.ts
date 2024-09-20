import { ReactNode } from "react";
import useMultiForm from "@/hooks/useMultiForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegisterValue } from "@/interface/auth.interface";

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
  const form = useForm({
    defaultValues,
    resolver: zodResolver(steps[multiform.currentStep].validation),
  });
  // Mutation
  const mutation = useMutation({
    mutationFn: async (value: RegisterValue) => {},
    mutationKey: ["register-mutation"],

    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return { multiform, form, mutation };
};

export default useRegister;
