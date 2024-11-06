import $api from "shared/http";
import { IInterests, IUser } from "shared/types";

class UserApi {
  getInterests = async () => {
    return $api.get<IInterests[]>("/user/interests");
  };

  addInterests = async (userId: string, interests: string[]) => {
    return $api.post(`/user/interests/${userId}`, { interests });
  };

  getUser = async (userId: string) => {
    return $api.get<{ user: IUser }>(`/user/${userId}`);
  };
}

export const userApi = new UserApi();
