import { create } from "zustand";
import { IAnime } from "shared/types";
import { kodikApi } from "shared/api";

interface IOngoingsStore {
  ongoings: IAnime[];
  setOngoings: (ongoings: IAnime[]) => void;
  fetchOngoings: () => Promise<void>;
}

const useOngoingsStore = create<IOngoingsStore>((set) => ({
  ongoings: [],
  setOngoings: (ongoings) => set({ ongoings }),

  fetchOngoings: async () => {
    const response = await kodikApi.getOngoings();
    set({ ongoings: response.data.ongoings });
  },
}));

export default useOngoingsStore;
