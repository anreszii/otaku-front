import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "./navigation.types";
import { FC } from "react";
import { privateRoutes } from "./routes";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const PrivateNavigation: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {privateRoutes.map((route) => (
        <Stack.Screen key={route.name} {...route}></Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

export default PrivateNavigation;
