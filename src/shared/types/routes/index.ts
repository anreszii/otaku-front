import { ComponentType } from "react";

export type RootStackParamList = {
  Intro: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Forgot: undefined;

  Tabs: undefined;

  Home: undefined;
  Calendar: undefined;
  Favorite: undefined;
  Rooms: undefined;
  Profile: undefined;
};

export interface IRoute {
  name: keyof RootStackParamList;
  component: ComponentType;
}
