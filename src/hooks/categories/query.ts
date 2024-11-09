import { View, Text } from "react-native";
import React from "react";
import useFetch from "../query/useFetch";
import { PrivateAxios } from "@/lib/axios";

export const useFetchCategories = () => {
  return useFetch({
    queryKey: ["/GET categories"],
    queryFn: async () => {
      const result = await PrivateAxios.get("/categories");
      return result.data;
    },
  });
};
