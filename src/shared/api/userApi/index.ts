import $api from "shared/http";
import { IInterests } from "shared/types";

class UserApi {
  getInterests = async () => {
    return $api.get<IInterests[]>("/user/interests");
  };

  addInterests = async (userId: string, interests: string[]) => {
    return $api.post(`/user/interests/${userId}`, { interests });
  };
}

export const userApi = new UserApi();
