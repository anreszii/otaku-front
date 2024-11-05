import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomBar } from "components";
import Calendar from "pages/Calendar";
import Favorite from "pages/Favorite";
import Home from "pages/Home";
import Profile from "pages/Profile";
import Rooms from "pages/Rooms";
import { RootStackParamList } from "shared/types";

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomBar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{ title: "Calendar" }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{ title: "Favorite" }}
      />
      <Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Tab.Screen name="Rooms" component={Rooms} options={{ title: "Rooms" }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
