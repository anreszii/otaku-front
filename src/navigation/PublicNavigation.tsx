import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "./navigation.types";
import { FC } from "react";
import { publicRoutes } from "./routes";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

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
