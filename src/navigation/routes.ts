import Welcome from "@/views/Welcome";
import { IRoute } from "./navigation.types";
import Onboarding from "@/views/Onboarding";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import ForgotPassword from "@/views/ForgotPassword";

export const privateRoutes: IRoute[] = [
  { name: "Onboarding", component: Onboarding },
  { name: "Welcome", component: Welcome },
  { name: "SignIn", component: SignIn },
  { name: "SignUp", component: SignUp },
  { name: "Forgot", component: ForgotPassword },
];

export const publicRoutes: IRoute[] = [];
