import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { DevSettings } from "react-native";
import { MMKV } from "react-native-mmkv";
import { IRefreshResponse } from "../types";
import RNRestart from "react-native-restart";

const storage = new MMKV();

const getToken = () => {
  const tokenString = storage.getString("token");
  return tokenString ? JSON.parse(tokenString) : null;
};

let accessToken = getToken();

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
    console.log(response.data);
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
        if (__DEV__) {
          DevSettings.reload();
        } else {
          RNRestart.Restart();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default $api;
