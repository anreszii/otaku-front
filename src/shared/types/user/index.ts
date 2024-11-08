import { IAnime } from "../kodik";

export interface ISearchUser {
  _id: string;
  username: string;
  avatar: string | null;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
  avatar: string | null;
  background: string | null;
  interests: string[];
  viewed: string[];
  level: number;
  exp: number;
  friends: IUserFriend[];
  subscriptions: IUserFriend[];
  subscribers: IUserFriend[];
  totalWatch: number;
  animeList: IAnimeList[];
  createdAt: number;
}

export interface IUserFriend
  extends Omit<IUser, "id" | "friends" | "subscriptions" | "subscribers"> {
  _id: string;
  friends: string[];
  subscriptions: string[];
  subscribers: string[];
}

export interface IAnimeList {
  _id: string;
  animeTitle: string;
  status: string;
  animeData?: IAnime;
}
