import {
  HomeIcon,
  FavoriteIcon,
  CalendarIcon,
  ProfileIcon,
  RoomsIcon,
} from "shared/icons";
import { IMenuData } from "../types";

export const bottomBarData: IMenuData[] = [
  {
    path: "Home",
    icon: HomeIcon,
  },
  {
    path: "Favorite",
    icon: FavoriteIcon,
  },
  {
    path: "Calendar",
    icon: CalendarIcon,
  },
  {
    path: "Profile",
    icon: ProfileIcon,
  },
  {
    path: "Rooms",
    icon: RoomsIcon,
  },
];
