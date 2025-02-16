import $api from "shared/http";
import { IAnime, IAnimeList, IInterests, ISearchUser, IUser } from "shared/types";

class UserApi {
  getList = async () => {
    return $api.get<{ list: IAnimeList[] }>("/user/list");
  };

  getInterests = async () => {
    return $api.get<IInterests[]>("/user/interests");
  };

  addInterests = async (interests: string[]) => {
    return $api.post(`/user/interests`, { interests });
  };

  getUser = async (userId: string) => {
    return $api.get<{ user: IUser }>(`/user/${userId}`);
  };

  searchUsers = async (query: string) => {
    return $api.post<ISearchUser[]>(`/user/search`, { query });
  };

  addList = async (animeTitle: string, status: string, posterUrl: string) => {
    return $api.post(`/user/list`, { animeTitle, status, posterUrl });
  };

  deleteList = async (listId: string) => {
    return $api.delete(`/user/list`, {
      data: {
        listId,
      },
    });
  };

  addFriend = async (friendId: string) => {
    return $api.post(`/user/friends`, { friendId });
  };

  deleteFriend = async (friendId: string) => {
    return $api.delete(`/user/friends`, {
      data: {
        friendId,
      },
    });
  };
}

export const userApi = new UserApi();
