import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Back } from "../../icons";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Typography from "../ui/Typography";

export default function HeaderBack({ title }: any) {
  const [statusBarHeight, setStatusBarHeight] = useState<any>(
    Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight
  );

  const navigation = useNavigation();

  console.log(statusBarHeight);
  return (
    <View
      style={[
        styles.container,
        { position: "absolute", top: statusBarHeight + 12 + 34 },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <Typography type="title" style={styles.title}>
        {title}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 48,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
});
