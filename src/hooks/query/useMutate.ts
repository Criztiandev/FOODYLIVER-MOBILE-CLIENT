import {
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
  useMutation,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

export interface ErrorResponse {
  error: string;
  stack?: string;
}

type MutateError = AxiosError<ErrorResponse>;

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
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    },
    onError: (error, variables, context) => {
      console.log(JSON.stringify(error, null, 2));

      if (error.response) {
        const errorMessage =
          (error.response.data as ErrorResponse)?.error ||
          "Something went wrong";
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      } else if (error.request) {
        Toast.show({
          type: "error",
          text1: "No response received from the server",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "An unknown error occurred",
        });
      }

      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}

export default useMutate;
