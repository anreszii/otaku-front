import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "shared/types";
import TabNavigation from "./TabNavigation";
import Anime from "pages/Anime";
import Friends from "pages/Friends";
import Subscribers from "pages/Subscribers";
import Search from "pages/Search";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const PrivateNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigation} />
      <Stack.Screen name="Anime" component={Anime} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="Subscribers" component={Subscribers} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
