import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Typography from "../ui/Typography";

interface HeaderProps {
  style?: object;
}

const HeaderReleases: React.FC<HeaderProps> = ({ style }) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    Platform.OS === "ios"
      ? getStatusBarHeight(true)
      : StatusBar.currentHeight || 0
  );

  return (
    <View style={[styles.container, { top: statusBarHeight + 12 + 34 }, style]}>
      <Typography type="title" style={styles.title}>
        Release Calendar
      </Typography>
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
    marginLeft: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
});

export default HeaderReleases;
