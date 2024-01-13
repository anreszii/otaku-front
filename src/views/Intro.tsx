import { SafeAreaView, StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect } from "react";
import CircleProgress from "../components/ui/CircleProgress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";

export default function Intro() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 113, height: 67 }}
        contentFit="contain"
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
