// import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 seconds
});

request.interceptors.request.use(
  (config) => {
    // Set the Authorization header for every request
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
