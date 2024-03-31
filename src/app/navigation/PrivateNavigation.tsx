import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { privateRoutes, RootStackParamList } from "shared/routes";
import useAsyncStorage from "shared/hooks/useAsyncStorage";
import { Onboarding } from "pages/onboarding";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
