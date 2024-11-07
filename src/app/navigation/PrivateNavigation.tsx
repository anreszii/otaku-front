import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "shared/types";
import TabNavigation from "./TabNavigation";
import Anime from "pages/Anime";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const PrivateNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigation} />
      <Stack.Screen name="Anime" component={Anime} />
    </Stack.Navigator>
  );
};
