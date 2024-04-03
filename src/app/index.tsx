import { Intro } from "pages/intro";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import "src/lib/utils/ignore-warnings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fontLoader } from "src/lib/utils/font-loader";
import Routing from "./routes";
import AuthProvider from "src/lib/providers/auth-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fontLoader();
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <View style={{ ...styles.intro, ...(isAppReady && { display: "none" }) }}>
        <Intro setIsAppReady={setIsAppReady} />
      </View>
      {!isLoading && (
        <GestureHandlerRootView>
          <AuthProvider>
            <SafeAreaProvider>
              <Routing />
            </SafeAreaProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      )}
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
