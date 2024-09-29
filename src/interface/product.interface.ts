import { QueryClient, UseQueryResult } from "@tanstack/react-query";

export interface ProductItem {
  id?: string;
  thumbnailUrl: string;
  name: string;
  price: number;
  rating: number;
  addons: Array<string>;
}

export interface ProductStore {
  queryClient: QueryClient;
  fetchProducts: () => UseQueryResult<ProductItem[], Error>;
  fetchProductById: (id: string) => UseQueryResult<ProductItem, Error>;
  fetchCategories: () => UseQueryResult<ProductItem[], Error>;
  fetchPopular: () => UseQueryResult<ProductItem[], Error>;
  fetchPromotional: () => UseQueryResult<ProductItem[], Error>;
  fetchRecommended: () => UseQueryResult<ProductItem[], Error>;
  invalidateQueries: (queryName: string) => void;
}
