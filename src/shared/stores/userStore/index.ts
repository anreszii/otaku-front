import { MMKV } from "react-native-mmkv";
import { userApi } from "shared/api";
import { ISearchUser, IUser } from "shared/types";
import { create } from "zustand";
import useFavoriteStore from "../favoriteStore";

const storage = new MMKV();

interface UserStore {
  user: IUser | null;
  searchUsers: ISearchUser[];
  setSearchUsers: (users: ISearchUser[]) => void;
  setUser: (user: IUser | null) => void;
  fetchUser: () => Promise<void>;
  fetchSearchUsers: (query: string) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  searchUsers: [],
  setSearchUsers: (users) => set({ searchUsers: users }),
  setUser: (user) => set({ user }),

  fetchUser: async () => {
    const user = JSON.parse(storage.getString("user") || "null");

    if (!user) return;

    const { data: userData } = await userApi.getUser(user.id);
    set({ user: userData.user });
    useFavoriteStore.getState().setFavorite(userData.user.animeList);
  },
  
  fetchSearchUsers: async (query: string) => {
    const { data: users } = await userApi.searchUsers(query);
    set({ searchUsers: users });
  },
}));

export default useUserStore;
