import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "shared/types";
import TabNavigation from "./TabNavigation";
import Anime from "pages/Anime";
import Friends from "pages/Friends";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const PrivateNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigation} />
      <Stack.Screen name="Anime" component={Anime} />
      <Stack.Screen name="Friends" component={Friends} />
    </Stack.Navigator>
  );
};
