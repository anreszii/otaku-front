import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

interface HeaderProps {
  title: string;
  style?: object;
}

const Header: React.FC<HeaderProps> = ({ title, style }) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    Platform.OS === "ios"
      ? getStatusBarHeight(true)
      : StatusBar.currentHeight || 0
  );

  return (
    <View style={[styles.container, { top: statusBarHeight + 12 + 10 }, style]}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
});

export default Header;
