import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "shared/types";
import Onboarding from "pages/Onboarding";
import Welcome from "pages/Welcome";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import Forgot from "pages/Forgot";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const PublicNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
};
