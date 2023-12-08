import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import Intro from "./src/views/Intro";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrivateStackNavigator, PublicStackNavigator } from "./src/navigation";

import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [isToken, setIsToken] = useState(false);

  const prepareApp = async () => {
    const token = await AsyncStorage.getItem("token");
    await Font.loadAsync({
      NeueHaasDisplay: require("./assets/fonts/NeueHaasDisplay-Medium.ttf"),
      UrbanistRegular: require("./assets/fonts/Urbanist-Regular.ttf"),
      UrbanistBold: require("./assets/fonts/Urbanist-Bold.ttf"),
    }).then(() => {
      if (token) {
        setIsToken(true);
      }
      setAppReady(true);
    });
  };

  useEffect(() => {
    (async () => {
      await prepareApp();
    })();
  }, []);

  if (!appReady) return <Intro />;

  return (
    <>
      {isToken ? (
        <NavigationContainer>
          <PrivateStackNavigator />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <PublicStackNavigator />
        </NavigationContainer>
      )}
    </>
  );
}
