import { MMKV } from "react-native-mmkv";
import { userApi } from "shared/api";
import { IInterests } from "shared/types";
import { create } from "zustand";

const storage = new MMKV();

interface InterestsStore {
  interests: IInterests[];
  setInterests: (interests: IInterests[]) => void;
  fetchInterests: () => Promise<void>;
}

const useInterestsStore = create<InterestsStore>((set) => ({
  interests: [],
  setInterests: (interests) => set({ interests }),

  fetchInterests: async () => {
    const { data: interests } = await userApi.getInterests();
    set({ interests });
  },
}));

export default useInterestsStore;
