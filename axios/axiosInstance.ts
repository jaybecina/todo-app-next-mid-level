// src/utils/axiosInstance.ts

import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const rootAPIURL = process.env.NEXT_PUBLIC_API_ROOT_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: rootAPIURL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
