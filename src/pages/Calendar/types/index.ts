import { IAnime } from "shared/types";

export interface WeekDay {
  numberOfWeek: number;
  dayOfWeek: string;
  focus: boolean;
  date: Date;
  ongoings: IAnime[];
}
