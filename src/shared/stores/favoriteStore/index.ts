import { kodikApi, userApi } from "shared/api";
import { IAnimeList } from "shared/types";
import { create } from "zustand";
import useUserStore from "../userStore";

interface IFavoriteStore {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  favorite: IAnimeList[];
  setFavorite: (favorite: IAnimeList[]) => Promise<void>;
  addList: (animeTitle: string, status: string) => Promise<void>;
  removeList: (listId: string) => Promise<void>;
  checkInList: (animeTitle: string) => IAnimeList | false;
}

const useFavoriteStore = create<IFavoriteStore>((set, get) => ({
  isLoading: false,
  setIsLoading: (state: boolean) => set({ isLoading: state }),
  favorite: [],
  setFavorite: async (favorite) => {
    get().setIsLoading(true);
    const tempFavorite = await Promise.all(
      favorite.map(async (anime, index) => {
        const {
          data: { anime: animeData },
        } = await kodikApi.getAnime(anime.animeTitle);
        return { ...anime, animeData };
      })
    );

    set({ favorite: tempFavorite });
    get().setIsLoading(false);
  },

  addList: async (animeTitle: string, status: string) => {
    await userApi.addList(animeTitle, status);
    await useUserStore.getState().fetchUser();
  },

  removeList: async (listId: string) => {
    await userApi.deleteList(listId);
    await useUserStore.getState().fetchUser();
  },

  checkInList: (animeTitle: string) => {
    return get().favorite.find((el) => el.animeTitle === animeTitle) || false;
  },
}));

export default useFavoriteStore;
