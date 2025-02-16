import { userApi } from "shared/api";
import { IAnimeList } from "shared/types";
import { create } from "zustand";
import useUserStore from "../userStore";

interface IFavoriteStore {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  fetchFavorites: () => Promise<void>;
  favorite: IAnimeList[];
  setFavorite: (favorite: IAnimeList[]) => Promise<void>;
  addList: (animeTitle: string, status: string, posterUrl: string) => Promise<void>;
  removeList: (listId: string) => Promise<void>;
  checkInList: (animeTitle: string) => IAnimeList | false;
}

const useFavoriteStore = create<IFavoriteStore>((set, get) => ({
  isLoading: false,
  setIsLoading: (state: boolean) => set({ isLoading: state }),

  fetchFavorites: async () => {
    set({ isLoading: true });
    const { data } = await userApi.getList();
    set({ favorite: data.list, isLoading: false });
  },

  favorite: [],
  setFavorite: async (favorite) => {
    set({ favorite });
  },

  addList: async (animeTitle: string, status: string, posterUrl: string) => {
    await userApi.addList(animeTitle, status, posterUrl);
    await get().fetchFavorites()
  },

  removeList: async (listId: string) => {
    await userApi.deleteList(listId);
    await get().fetchFavorites()
  },

  checkInList: (animeTitle: string) => {
    return get().favorite.find((el) => el.animeTitle === animeTitle) || false;
  },
}));

export default useFavoriteStore;
