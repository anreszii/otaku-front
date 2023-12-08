import {
  SafeAreaView,
  Image,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect } from "react";
import CircleProgress from "../components/ui/CircleProgress";

export default function Intro() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 113, height: 67 }}
        resizeMode="contain"
      />
      <CircleProgress />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
