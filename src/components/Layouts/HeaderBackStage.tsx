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

export default function HeaderBackStage({ title, stage, setStage }: any) {
  const [statusBarHeight, setStatusBarHeight] = useState<any>(
    Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight
  );

  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { position: "absolute", top: statusBarHeight + 12 + 10 },
      ]}
    >
      <TouchableOpacity onPress={() => setStage(stage - 1)}>
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
    width: "100%",
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
