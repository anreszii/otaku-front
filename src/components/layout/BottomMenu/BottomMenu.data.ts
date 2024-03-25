import {
  CalendarIcon,
  ChatIcon,
  HomeIcon,
  ProfileIcon,
  RoomsIcon,
} from "@/icons";
import { IMenuItem } from "@/types/menu";

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
