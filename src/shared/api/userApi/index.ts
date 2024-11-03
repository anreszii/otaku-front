import $api from "shared/http";
import { IInterests } from "shared/types";

class UserApi {
  getInterests = async () => {
    return $api.get<IInterests[]>("/user/interests");
  };
}

export const userApi = new UserApi();
