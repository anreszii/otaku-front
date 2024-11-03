import { MMKV } from "react-native-mmkv";
import { create } from "zustand";

const storage = new MMKV();

interface AuthStore {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
}));

export default useAuthStore;
