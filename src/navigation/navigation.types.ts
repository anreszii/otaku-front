import { ComponentType } from "react";

export type TypeRootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Forgot: undefined;

  Calendar: undefined;
  Chat: undefined;
  Home: undefined;
  Rooms: undefined;
  Profile: undefined;

  Tabs: undefined;
};

export interface IRoute {
  name: keyof TypeRootStackParamList;
  component: ComponentType;
}
