import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { MMKV } from "react-native-mmkv";
import { IRefreshResponse } from "../types";
import { reloadApp } from "../utils";

const storage = new MMKV();

let accessToken = storage.getString("token");

storage.addOnValueChangedListener((key) => {
  if (key === "token") {
    accessToken = storage.getString(key);
  }
});

const $api = axios.create({
  baseURL: "http://127.0.0.1:3005/api",
});

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _isRetry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IRefreshResponse>(
          "http://127.0.0.1:3005/api/auth/refresh"
        );
        const newAccessToken = response.data.accessToken;

        storage.set("token", JSON.stringify(newAccessToken));

        accessToken = newAccessToken;

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return $api.request(originalRequest);
      } catch (refreshError) {
        storage.delete("token");
        reloadApp();
      }
    }
    return Promise.reject(error);
  }
);

export default $api;
