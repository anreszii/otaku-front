import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

export default function Container({ children }: any) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 48,
    marginRight: 24,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
});
