import { Dispatch, SetStateAction } from "react";

export interface IIntro {
  setIsAppReady: Dispatch<SetStateAction<boolean>>;
}
