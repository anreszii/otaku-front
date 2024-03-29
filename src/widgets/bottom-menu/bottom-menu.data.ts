import {
  CalendarIcon,
  ChatIcon,
  HomeIcon,
  ProfileIcon,
  RoomsIcon,
} from "shared/icons";
import { IMenuItem } from "shared/types/menu";

export const bottomMenuData: IMenuItem[] = [
  {
    path: "Calendar",
    icon: CalendarIcon,
  },
  {
    path: "Chat",
    icon: ChatIcon,
  },
  {
    path: "Home",
    icon: HomeIcon,
  },
  {
    path: "Rooms",
    icon: RoomsIcon,
  },
  {
    path: "Profile",
    icon: ProfileIcon,
  },
];
