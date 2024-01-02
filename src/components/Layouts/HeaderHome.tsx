import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  NativeModules,
} from "react-native";
import React, { useState } from "react";
import { Notification, Search } from "../../icons";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
const { StatusBarManager } = NativeModules;

export default function HeaderHome() {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    StatusBarManager.HEIGHT
  );

  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        styles.container,
        { position: "absolute", top: statusBarHeight + 12 },
      ]}
    >
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => navigation.navigate("Search")}
      >
        <Search color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 24 }}
        onPress={() => navigation.navigate("Notification")}
      >
        <Notification color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
});
