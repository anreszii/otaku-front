import { useFonts } from "expo-font-weights";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PrivateNavigation } from "./navigation/PrivateNavigation";
import { PublicNavigation } from "./navigation/PublicNavigation";
import Intro from "pages/Intro";
import { StyleSheet, View } from "react-native";
import "shared/utils/ignoreWarnings";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist.ttf"),
  });
  const [isIntro, setIsIntro] = useState(true);
  const isAuth = false;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          {isIntro && (
            <View style={styles.intro}>
              <Intro setIsIntro={setIsIntro} />
            </View>
          )}
          {isAuth ? <PrivateNavigation /> : <PublicNavigation />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  intro: {
    position: "absolute",
    zIndex: 1000,
    width: "100%",
    height: "100%",
  },
});

export default App;
