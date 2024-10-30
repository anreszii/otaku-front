import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomBar } from "components";
import Home from "pages/Home";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
