import { Intro } from "pages/intro";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import "shared/lib/ignoreWarnings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fontLoader } from "shared/lib/fontLoader";
import Routing from "./routes";
import AuthProvider from "shared/providers/AuthProvider";

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
        <AuthProvider>
          <SafeAreaProvider>
            <Routing />
          </SafeAreaProvider>
        </AuthProvider>
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
