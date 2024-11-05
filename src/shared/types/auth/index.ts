import { IUser } from "../user";

export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginData {
  username: string;
  password: string;
  deviceId: string;
}

export interface ILoginResponse extends IRefreshResponse {
  user: IUser;
}

export interface IRegisterData {
  username: string;
  password: string;
  email: string;
  deviceId: string;
}

export interface IRegisterResponse extends IRefreshResponse {
  user: IUser;
}

export interface IResetPasswordData {
  email: string;
  password: string;
  code: string;
}

export interface IVerifyResetCodeData {
  email: string;
  code: string;
}
