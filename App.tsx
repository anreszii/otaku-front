import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DevSettings, LogBox } from "react-native";
import authService from "./src/api/auth/authService";
import Intro from "./src/views/Intro";
import { PrivateStackNavigator, PublicStackNavigator } from "./src/navigation";
import * as Linking from "expo-linking";

LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [isToken, setIsToken] = useState(false);
  // const prefix = Linking.createURL("/");
  // const linking = {
  //   prefixes: [prefix],
  //   config: {
  //     screens: {
  //       Main: "Main",
  //     },
  //   },
  // };
  // console.log(prefix, linking);

  const prepareApp = async () => {
    await Font.loadAsync({
      NeueHaasDisplay: require("./assets/fonts/NeueHaasDisplay-Medium.ttf"),
      UrbanistRegular: require("./assets/fonts/Urbanist-Regular.ttf"),
      UrbanistBold: require("./assets/fonts/Urbanist-Bold.ttf"),
    });

    const token = await AsyncStorage.getItem("token");
    setIsToken(!!token);
    setAppReady(true);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const data = await authService.checkAuth();
          await AsyncStorage.setItem("token", data.data.accessToken);
          await AsyncStorage.setItem("id", data.data.user.id);
        } catch (e) {
          await AsyncStorage.removeItem("token");
          DevSettings.reload();
        }
      }

      await prepareApp();
    };

    checkAuthentication();
  }, []);

  if (!appReady) return <Intro />;

  return (
    <NavigationContainer>
      {isToken ? <PrivateStackNavigator /> : <PublicStackNavigator />}
    </NavigationContainer>
  );
}
