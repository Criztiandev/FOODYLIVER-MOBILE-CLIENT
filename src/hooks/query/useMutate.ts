import {
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
  useMutation,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

type MutateError = Error;

interface MutationConfig<TData, TVariables, TContext = unknown>
  extends Omit<
    UseMutationOptions<TData, MutateError, TVariables, TContext>,
    "mutationFn"
  > {
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey?: QueryKey;
}

function useMutate<TData = unknown, TVariables = unknown, TContext = unknown>({
  mutationFn,
  queryKey,
  ...options
}: MutationConfig<TData, TVariables, TContext>): UseMutationResult<
  TData,
  MutateError,
  TVariables,
  TContext
> {
  const queryClient = useQueryClient();

  return useMutation<TData, MutateError, TVariables, TContext>({
    mutationFn: async (variables) => {
      try {
        return await mutationFn(variables);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Unknown error occurred");
      }
    },
    ...options,
    onSuccess: (data, variables, context) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      let errorMessage = error.message || "An unknown error occurred";

      if (error instanceof AxiosError && error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          errorMessage;
      }

      Toast.show({
        type: "error",
        text1: errorMessage,
      });

      options.onError?.(error, variables, context);
    },
  });
}

export default useMutate;
