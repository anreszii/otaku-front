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
  fetchSearchUsers: (query: string) => Promise<number>;
  addFriend: (friendId: string) => Promise<void>;
  deleteFriend: (friendId: string) => Promise<void>;
}

const useUserStore = create<UserStore>((set, get) => ({
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
    return users.length;
  },

  addFriend: async (friendId: string) => {
    await userApi.addFriend(friendId);
    await get().fetchUser();
  },

  deleteFriend: async (friendId: string) => {
    await userApi.deleteFriend(friendId);
    await get().fetchUser();
  },
}));

export default useUserStore;
