import { kodikApi, userApi } from "shared/api";
import { IAnimeList } from "shared/types";
import { create } from "zustand";
import useUserStore from "../userStore";

interface IFavoriteStore {
  favorite: IAnimeList[];
  setFavorite: (favorite: IAnimeList[]) => Promise<void>;
  addList: (
    userId: string,
    animeTitle: string,
    status: string
  ) => Promise<void>;
  removeList: (userId: string, listId: string) => Promise<void>;
  checkInList: (animeTitle: string) => IAnimeList | false;
}

const useFavoriteStore = create<IFavoriteStore>((set, get) => ({
  favorite: [],
  setFavorite: async (favorite) => {
    const tempFavorite = await Promise.all(
      favorite.map(async (anime) => {
        const {
          data: { anime: animeData },
        } = await kodikApi.getAnime(anime.animeTitle);
        return { ...anime, animeData };
      })
    );

    set({ favorite: tempFavorite });
  },

  addList: async (userId: string, animeTitle: string, status: string) => {
    await userApi.addList(userId, animeTitle, status);
    await useUserStore.getState().fetchUser();
  },

  removeList: async (userId: string, listId: string) => {
    await userApi.deleteList(userId, listId);
    await useUserStore.getState().fetchUser();
  },

  checkInList: (animeTitle: string) => {
    return get().favorite.find((el) => el.animeTitle === animeTitle) || false;
  },
}));

export default useFavoriteStore;
