export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export type TypeUserState = IUser | null;
