import Intro from "@/views/Intro";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.intro}>
        <Intro setIsAppReady={setIsAppReady} />
      </View>
      <View style={styles.container}>
        <Text style={{ color: "white" }}>
          Open up App.tsx to start working on your app!
        </Text>
      </View>
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
