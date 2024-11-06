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
import { Asset } from "expo-asset";
import { useAuthStore, useInterestsStore, useUserStore } from "shared/stores";
import Animated, {
  FadeInLeft,
  FadeInRight,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist.ttf"),
  });

  const [isIntro, setIsIntro] = useState(true);

  const { fetchInterests } = useInterestsStore();
  const { isAuth } = useAuthStore();
  const { fetchUser } = useUserStore();

  useEffect(() => {
    const prepare = async () => {
      if (loaded) {
        try {
          await Asset.loadAsync([
            require("../../assets/images/otakuLogo.png"),
            require("../../assets/images/backgroundOnboarding.png"),
          ]);
          await fetchInterests();
          await SplashScreen.hideAsync();
        } catch (error) {
          console.log(error);
        }
      }
    };

    prepare();
  }, [loaded]);

  useEffect(() => {
    if (isAuth) {
      fetchUser();
    }
  }, [isAuth]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          {isIntro && (
            <View style={styles.intro}>
              <Intro setIsIntro={setIsIntro} />
            </View>
          )}
          {isAuth && (
            <Animated.View
              style={{ flex: 1 }}
              entering={FadeInRight.duration(200)}
              exiting={SlideOutLeft.duration(300)}
            >
              <PrivateNavigation />
            </Animated.View>
          )}
          {!isAuth && (
            <Animated.View
              style={{ flex: 1 }}
              entering={FadeInRight.duration(200)}
              exiting={SlideOutLeft.duration(300)}
            >
              <PublicNavigation />
            </Animated.View>
          )}
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
