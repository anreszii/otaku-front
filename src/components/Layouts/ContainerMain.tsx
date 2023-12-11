import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

interface IContainerMain {
  children: any;
  style?: any;
}

const ContainerMain: React.FC<IContainerMain> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default ContainerMain;

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
