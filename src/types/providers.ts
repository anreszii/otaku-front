import { TypeUserState } from "./user";

export interface IAuthContext {
  user: TypeUserState;
  setUser: (value: TypeUserState) => Promise<void>;
}
