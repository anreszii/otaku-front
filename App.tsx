import Navigation from "@/navigation/Navigation";
import AuthProvider from "@/providers/AuthProvider";
import Intro from "@/views/Intro";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import "@/helpers/ignoreWarnings";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        NotoSansJPRegular: require("./assets/fonts/NotoSansJP-Regular.ttf"),
        NotoSansJPBold: require("./assets/fonts/NotoSansJP-Bold.ttf"),
        NotoSansJPSemiBold: require("./assets/fonts/NotoSansJP-SemiBold.ttf"),
        NotoSansJPMedium: require("./assets/fonts/NotoSansJP-Medium.ttf"),
        UrbanistRegular: require("./assets/fonts/Urbanist-Regular.ttf"),
        UrbanistBold: require("./assets/fonts/Urbanist-Bold.ttf"),
        UrbanistSemiBold: require("./assets/fonts/Urbanist-SemiBold.ttf"),
        UrbanistMedium: require("./assets/fonts/Urbanist-Medium.ttf"),
      });
    })();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <View style={{ ...styles.intro, ...(isAppReady && { display: "none" }) }}>
        <Intro setIsAppReady={setIsAppReady} />
      </View>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1218",
    alignItems: "center",
    justifyContent: "center",
  },
  intro: {
    position: "absolute",
    zIndex: 1000,
    width: "100%",
    height: "100%",
  },
});

export default App;
