import axios from "axios";
import {
  requestInterceptorFulfill,
  requestInterceptorReject,
  responseInterceptorFulfill,
  responseInterceptorReject,
} from "./interceptors";

export const AxiosInstance = axios.create({
  baseURL: "https://iamjohn.cloud/api",
});

export const PublicAxios = axios.create({
  baseURL: "https://iamjohn.cloud/api",
});

export const PrivateAxios = axios.create({
  baseURL: "https://iamjohn.cloud/api",
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
