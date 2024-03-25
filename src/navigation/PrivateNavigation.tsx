import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "./navigation.types";
import { FC } from "react";
import { privateRoutes } from "./routes";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import Onboarding from "@/views/Onboarding";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const PrivateNavigation: FC = () => {
  const { storedValue } = useAsyncStorage<boolean>("seeOnboarding");

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!storedValue && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
      {privateRoutes.map((route) => (
        <Stack.Screen key={route.name} {...route}></Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

export default PrivateNavigation;
