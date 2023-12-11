import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DevSettings } from "react-native";

export const $apiAuth = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/auth",
});

export const $apiUser = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/user",
});

$apiUser.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

$apiUser.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        console.log("hello")
        await axios
          .get("http://localhost:3000/auth/refresh", { withCredentials: true })
          .then(async (data) => {
            await AsyncStorage.setItem("token", data.data.accessToken);
          })
          .catch(async (e) => {
            await AsyncStorage.removeItem("token");
            DevSettings.reload();
          });
        return $apiUser.request(originalRequest);
      } catch (e) {
        console.log("index.ts", e);
      }
    }
    throw error;
  }
);
