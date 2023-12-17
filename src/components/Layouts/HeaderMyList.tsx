import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Typography from "../ui/Typography";
import { Search } from "../../icons";

interface HeaderProps {
  style?: object;
}

const HeaderMyList: React.FC<HeaderProps> = ({ style }) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    Platform.OS === "ios"
      ? getStatusBarHeight(true)
      : StatusBar.currentHeight || 0
  );

  return (
    <View
      style={{
        ...styles.container,
        ...{ top: statusBarHeight + 12 + 34 },
        ...style,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../../assets/icon.png")}
          style={{ width: 31, height: 28, marginRight: 10 }}
          resizeMode="contain"
        />
        <Typography type="title" style={styles.title}>
          My List
        </Typography>
      </View>
      <TouchableOpacity>
        <Search color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "87%",
    height: 48,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    marginLeft: 24,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
});

export default HeaderMyList;
