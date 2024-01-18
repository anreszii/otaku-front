import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DevSettings, LogBox } from "react-native";
import authService from "./src/api/auth/authService";
import Intro from "./src/views/Intro";
import { PrivateStackNavigator, PublicStackNavigator } from "./src/navigation";
import * as Linking from "expo-linking";
import * as ScreenOrientation from "expo-screen-orientation";
import { NetworkProvider } from "./src/providers/NetworkContext";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./src/plugins/i18n";

LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [data, setData] = useState<any>(null);
  const prefix = Linking.createURL("");
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        AnimePage: "Anime",
      },
    },
  };

  const prepareApp = async () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    await Font.loadAsync({
      NeueHaasDisplay: require("./assets/fonts/NeueHaasDisplay-Medium.ttf"),
      UrbanistRegular: require("./assets/fonts/Urbanist-Regular.ttf"),
      UrbanistBold: require("./assets/fonts/Urbanist-Bold.ttf"),
      UrbanistSemiBold: require("./assets/fonts/Urbanist-SemiBold.ttf"),
      UrbanistMedium: require("./assets/fonts/Urbanist-Medium.ttf"),
    });

    const token = await AsyncStorage.getItem("token");
    setIsToken(!!token);
    setAppReady(true);
  };

  const handleLink = (e: any) => {
    const data = Linking.parse(e.url);
    setData(data);
  };

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setData(Linking.parse(initialURL));
    }

    Linking.addEventListener("url", handleLink);
    if (!data) {
      getInitialURL();
    }

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
    <I18nextProvider i18n={i18n}>
      <NetworkProvider>
        <NavigationContainer linking={linking}>
          {isToken ? <PrivateStackNavigator /> : <PublicStackNavigator />}
        </NavigationContainer>
      </NetworkProvider>
    </I18nextProvider>
  );
}
