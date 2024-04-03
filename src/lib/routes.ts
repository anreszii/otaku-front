import { Welcome } from "pages/welcome";
import { SignIn } from "pages/sign-in";
import { SignUp } from "pages/sign-up";
import { ForgotPassword } from "pages/forgot-password";
import { ComponentType } from "react";

export type RootStackParamList = {
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
  name: keyof RootStackParamList;
  component: ComponentType;
}

export const privateRoutes: IRoute[] = [
  { name: "Welcome", component: Welcome },
  { name: "SignIn", component: SignIn },
  { name: "SignUp", component: SignUp },
  { name: "Forgot", component: ForgotPassword },
];

export const publicRoutes: IRoute[] = [];
