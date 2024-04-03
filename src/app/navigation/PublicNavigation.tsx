import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { publicRoutes, RootStackParamList } from "src/lib/routes";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const PublicNavigation: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigation}></Stack.Screen>
      {publicRoutes.map((route) => (
        <Stack.Screen key={route.name} {...route}></Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

export default PublicNavigation;
