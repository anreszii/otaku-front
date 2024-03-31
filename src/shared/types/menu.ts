import { RootStackParamList } from "shared/routes";

export interface IMenuItem {
  icon: (focus?: boolean) => React.JSX.Element;
  path: keyof RootStackParamList;
}

export type TypeNav = (name: keyof RootStackParamList) => void;
