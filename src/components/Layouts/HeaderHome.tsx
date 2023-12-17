import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Nofification, Search } from "../../icons";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Typography from "../ui/Typography";

export default function HeaderHome() {
  const [statusBarHeight, setStatusBarHeight] = useState<any>(
    Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight
  );

  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        { position: "absolute", top: statusBarHeight + 12 + 34 },
      ]}
    >
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {}}>
        <Search color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginRight: 24 }} onPress={() => {}}>
        <Nofification />
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
