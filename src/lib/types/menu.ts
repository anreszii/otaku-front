import { RootStackParamList } from "src/lib/routes";

export interface IMenuItem {
  icon: (focus?: boolean) => React.JSX.Element;
  path: keyof RootStackParamList;
}

export type TypeNav = (name: keyof RootStackParamList) => void;
