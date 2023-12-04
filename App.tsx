import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio, ResizeMode, Video } from "expo-av";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator, TabNavigator } from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: 400,
    height: 200,
  },
});
