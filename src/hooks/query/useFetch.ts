import {
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import useScreenFocus from "../utils/useScreenFocus";
import useAccountStore from "@/state/useAccountStore";

type CustomQueryFunction<TData> = (
  context: QueryFunctionContext
) => Promise<TData>;

interface CustomUseQueryOptions<TData, TError>
  extends Omit<UseQueryOptions<TData, TError>, "queryFn"> {
  queryFn: CustomQueryFunction<TData>;
  runOnlyWhenFocused?: boolean;
}

const useFetch = <TData = unknown, TError = AxiosError>(
  options: CustomUseQueryOptions<TData, TError>
): UseQueryResult<TData, TError> => {
  const { logout } = useAccountStore();
  const { isFocused } = useScreenFocus();

  return useQuery<TData, TError>({
    ...options,
    queryFn: async (context: QueryFunctionContext) => {
      try {
        return await options.queryFn(context);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            logout();
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: error.message || "An unexpected error occurred",
            });
          }
        }
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    enabled: options.runOnlyWhenFocused ? isFocused : true,
  });
};

export default useFetch;
