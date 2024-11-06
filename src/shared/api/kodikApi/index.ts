import $api from "shared/http";
import { IAnime } from "shared/types";

class KodikApi {
  getOngoings = async () => {
    return $api.get<{ ongoings: IAnime[] }>(`/kodik/ongoings`);
  };
}

export const kodikApi = new KodikApi();
