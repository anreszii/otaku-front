import $api from "shared/http";
import { IAnime } from "shared/types";
import { IAnimeUrlResponse } from "shared/types/kodik";

class KodikApi {
  getOngoings = async () => {
    return $api.get<{ ongoings: IAnime[] }>(`/kodik/ongoings`);
  };

  getAnime = async (title: string) => {
    return $api.get<{ anime: IAnime }>(`/kodik/anime/${title}`);
  };

  getAnimeUrl = async (link: string) => {
    return $api.post<IAnimeUrlResponse>("/kodik/anime-link", { link });
  };
}

export const kodikApi = new KodikApi();
