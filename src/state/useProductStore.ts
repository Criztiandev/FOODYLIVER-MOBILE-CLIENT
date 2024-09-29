import useFetch from "@/hooks/query/useFetch";
import { ProductItem, ProductStore } from "@/interface/product.interface";
import { PrivateAxios } from "@/lib/axios";
import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

const useProductStore = create<ProductStore>((set, get) => ({
  queryClient: new QueryClient(),

  fetchProducts: () =>
    useFetch({
      queryKey: ["products"],
      queryFn: async () => {
        const result = await PrivateAxios.get<ProductItem[]>("/products/all");
        return result.data;
      },
    }),

  fetchProductById: (id: string) =>
    useFetch({
      queryKey: [`products-${id}`],
      queryFn: async () => {
        const result = await PrivateAxios.get<ProductItem>(`/products/${id}`);
        return result.data;
      },
    }),

  fetchCategories: () =>
    useFetch({
      queryKey: ["products-categories"],
      queryFn: async () => {
        const result = await PrivateAxios.get<ProductItem[]>(
          "/products/categories/all"
        );
        return result.data;
      },
    }),

  fetchPopular: () =>
    useFetch({
      queryKey: ["products-popular"],
      queryFn: async () => {
        const result = await PrivateAxios.get<ProductItem[]>(
          "/products/popular/all"
        );
        return result.data;
      },
    }),

  fetchPromotional: () =>
    useFetch({
      queryKey: ["products-promitional"],
      queryFn: async () => {
        const result = await PrivateAxios.get<ProductItem[]>(
          "/products/promitional/all"
        );
        return result.data;
      },
    }),

  fetchRecommended: () =>
    useFetch({
      queryKey: ["products-promitional"],
      queryFn: async () => {
        const result = await PrivateAxios.get<ProductItem[]>(
          "/products/recommended/all"
        );
        return result.data;
      },
    }),

  invalidateQueries: (queryName: string) => {
    const { queryClient } = get();
    queryClient.invalidateQueries({ queryKey: ["products", queryName] });
  },
}));

export default useProductStore;
