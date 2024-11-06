export interface IUser {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  avatar: string | null;
  background: string | null;
  interests: string[];
  viewed: string[];
  level: number;
  exp: number;
  totalWatch: number;
  animeList: string[];
  createdAt: number;
}
