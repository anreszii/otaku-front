import { authApi, userApi } from "shared/api";
import { MMKV } from "react-native-mmkv";
import {
  ILoginData,
  IRegisterData,
  IResetPasswordData,
  IVerifyResetCodeData,
} from "shared/types";
import { create } from "zustand";

const storage = new MMKV();

interface AuthStore {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  login: (data: ILoginData) => Promise<any>;
  register: (
    data: IRegisterData,
    interests: string[],
    step: number
  ) => Promise<any>;
  sendReset: (email: string) => Promise<any>;
  verifyResetCode: (data: IVerifyResetCodeData) => Promise<any>;
  resetPassword: (data: IResetPasswordData) => Promise<any>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  isAuth: storage.getBoolean("isAuth") || false,
  setIsAuth: (isAuth) => {
    storage.set("isAuth", isAuth);
    set({ isAuth });
  },

  login: async (data: ILoginData) => {
    try {
      const { data: loginData } = await authApi.login(data);

      console.log(loginData);

      storage.set("token", loginData.accessToken);
      storage.set("user", JSON.stringify(loginData.user));
      storage.set("isAuth", true);

      set({ isAuth: true });
    } catch (e: any) {
      console.log(e);
      return e.response.data.message;
    }
  },

  register: async (data: IRegisterData, interests: string[], step: number) => {
    try {
      if (step === 0) {
        const { data: registerData } = await authApi.register(data);

        storage.set("token", registerData.accessToken);
        storage.set("user", JSON.stringify(registerData.user));
        storage.set("isAuth", true);
      } else if (step === 1) {
        await userApi.addInterests(interests);
        set({ isAuth: true });
      }
    } catch (e: any) {
      console.log(e);
      return e.response.data.message;
    }
  },

  sendReset: async (email: string) => {
    try {
      await authApi.sendReset(email);
    } catch (e: any) {
      console.log(e.response.data);
      return e.response.data.message;
    }
  },

  verifyResetCode: async (data: IVerifyResetCodeData) => {
    try {
      await authApi.verifyResetCode(data);
    } catch (e: any) {
      console.log(e);
      return e.response.data.message;
    }
  },

  resetPassword: async (data: IResetPasswordData) => {
    try {
      await authApi.resetPassword(data);
    } catch (e: any) {
      console.log(e);
      return e.response.data.message;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
      storage.delete("token");
      storage.delete("user");
      get().setIsAuth(false);
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useAuthStore;
