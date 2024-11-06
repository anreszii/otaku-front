import { MMKV } from "react-native-mmkv";
import { userApi } from "shared/api";
import { IUser } from "shared/types";
import { create } from "zustand";

const storage = new MMKV();

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  fetchUser: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  fetchUser: async () => {
    const user = JSON.parse(storage.getString("user") || "null");

    if (!user) return;

    const { data: userData } = await userApi.getUser(user.id);
    set({ user: userData.user });
  },
}));

export default useUserStore;
