import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

export default function ContainerMain({ children }: any) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 48,
    marginRight: 24,
    width: "100%",
    height: "100%",
  },
});
