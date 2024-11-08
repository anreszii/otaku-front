import $api from "shared/http";
import { IInterests, ISearchUser, IUser } from "shared/types";

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

  searchUsers = async (query: string) => {
    return $api.post<ISearchUser[]>(`/user/search`, { query });
  };

  addList = async (userId: string, animeTitle: string, status: string) => {
    return $api.post(`/user/list/${userId}`, { animeTitle, status });
  };

  deleteList = async (userId: string, listId: string) => {
    return $api.delete(`/user/list/${userId}?listId=${listId}`);
  };
}

export const userApi = new UserApi();
