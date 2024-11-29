import axios from "axios";
import {
  requestInterceptorFulfill,
  requestInterceptorReject,
  responseInterceptorFulfill,
  responseInterceptorReject,
} from "./interceptors";

export const AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
});

export const PublicAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
});

export const PrivateAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
  withCredentials: true,
});

PrivateAxios.interceptors.request.use(
  requestInterceptorFulfill,
  requestInterceptorReject
);
PrivateAxios.interceptors.response.use(
  responseInterceptorFulfill,
  responseInterceptorReject
);
