import { TypeRootStackParamList } from "@/navigation/navigation.types";
import { ReactNode } from "react";

export interface IMenuItem {
  icon: (focus?: boolean) => React.JSX.Element;
  path: keyof TypeRootStackParamList;
}

export type TypeNav = (name: keyof TypeRootStackParamList) => void;
