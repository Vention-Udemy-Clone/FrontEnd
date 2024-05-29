import { LOCAL_STORAGE_KEYS } from "@/config/local-storage.config";
import axios from "axios";
import { getValueFromLocalStorage } from "./utils";

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000, // 15 seconds
});

request.interceptors.request.use(
  (config) => {
    const token = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.accessToken);

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
