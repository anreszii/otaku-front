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
import useOngoingsStore from "shared/stores/ongoingsStore";
import { PortalProvider } from "@gorhom/portal";
import * as Linking from "expo-linking";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import { DeepLinkProvider } from "shared/providers/DeepLinking/DeepLinkingProvider";

SplashScreen.preventAutoHideAsync();

const ANIMATION_DURATION = {
  ENTER: 200,
  EXIT: 300,
};

const ASSETS = [
  require("../../assets/images/otakuLogo.png"),
  require("../../assets/images/backgroundOnboarding.png"),
];

const AnimatedNavigationContainer: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => (
  <Animated.View
    style={{ flex: 1 }}
    entering={FadeInRight.duration(ANIMATION_DURATION.ENTER)}
    exiting={SlideOutLeft.duration(ANIMATION_DURATION.EXIT)}
    {...props}
  >
    {children}
  </Animated.View>
);

const linking = {
  prefixes: ["otaku://"],
  config: {
    screens: {
      Tabs: "tabs",
      Anime: "anime/:title",
      Player: "player/:episodeLink",
    },
  },
};

const App = () => {
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist.ttf"),
  });

  const [isIntro, setIsIntro] = useState(true);

  const { fetchInterests } = useInterestsStore();
  const { isAuth } = useAuthStore();
  const { fetchUser } = useUserStore();
  const { fetchOngoings } = useOngoingsStore();

  const loadInitialResources = async () => {
    const commonTasks = [Asset.loadAsync(ASSETS), fetchInterests()];

    const authTasks = isAuth ? [fetchOngoings(), fetchUser()] : [];

    try {
      await Promise.all([...commonTasks, ...authTasks]);
      await SplashScreen.hideAsync();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loaded) {
      loadInitialResources();
    }
  }, [loaded, isAuth]);

  return (
    <PortalProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <NavigationContainer linking={linking}>
            <DeepLinkProvider>
              {isIntro && (
                <View style={styles.intro}>
                  <Intro setIsIntro={setIsIntro} />
                </View>
              )}
              {isAuth && (
                <AnimatedNavigationContainer>
                  <PrivateNavigation />
                </AnimatedNavigationContainer>
              )}
              {!isAuth && (
                <AnimatedNavigationContainer>
                  <PublicNavigation />
                </AnimatedNavigationContainer>
              )}
            </DeepLinkProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PortalProvider>
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
