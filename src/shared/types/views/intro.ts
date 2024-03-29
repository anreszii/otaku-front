import { Dispatch, SetStateAction } from "react";

export interface IntroProps {
  setIsAppReady: Dispatch<SetStateAction<boolean>>;
}
