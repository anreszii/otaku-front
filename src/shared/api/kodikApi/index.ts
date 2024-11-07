import $api from "shared/http";
import { IAnime } from "shared/types";

class KodikApi {
  getOngoings = async () => {
    return $api.get<{ ongoings: IAnime[] }>(`/kodik/ongoings`);
  };

  getAnime = async (title: string) => {
    return $api.get<{ anime: IAnime }>(`/kodik/anime/${title}`);
  };
}

export const kodikApi = new KodikApi();
