import { create } from "zustand";
import { IAnime } from "shared/types";
import { kodikApi } from "shared/api";
import { IAnimeUrlResponse } from "shared/types/kodik";

interface IAnimeStore {
  currentAnime: IAnime | undefined;
  setCurrentAnime: (anime?: IAnime) => void;
  fetchAnime: (title: string) => Promise<void>;
  fetchAnimeUrl: (link: string) => Promise<IAnimeUrlResponse>;
}

const useAnimeStore = create<IAnimeStore>()((set) => ({
  currentAnime: undefined,
  setCurrentAnime: (anime) => set({ currentAnime: anime }),

  fetchAnime: async (title: string) => {
    const {
      data: { anime },
    } = await kodikApi.getAnime(title);

    set({
      currentAnime: {
        ...anime,
        title,
      },
    });
  },

  fetchAnimeUrl: async (link: string) => {
    const { data } = await kodikApi.getAnimeUrl(link);

    return data;
  },
}));

export default useAnimeStore;
