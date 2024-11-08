import { create } from "zustand";
import { IAnime } from "shared/types";
import { kodikApi } from "shared/api";

interface IAnimeStore {
  currentAnime: IAnime | undefined;
  setCurrentAnime: (anime?: IAnime) => void;
  fetchAnime: (title: string) => Promise<void>;
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
}));

export default useAnimeStore;
