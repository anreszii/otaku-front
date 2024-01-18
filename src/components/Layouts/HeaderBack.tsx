import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  NativeModules,
  ViewStyle,
  ViewProps,
} from "react-native";
import React, { FC, useState } from "react";
import { Back } from "../../icons";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Typography from "../ui/Typography";
const { StatusBarManager } = NativeModules;

interface HeaderBackProps extends ViewProps {
  title: string;
  style?: ViewStyle;
}

const HeaderBack: FC<HeaderBackProps> = ({ title, style }) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    StatusBarManager.HEIGHT
  );

  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        { position: "absolute", top: statusBarHeight + 12 },
        { ...style },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back color="#000" />
      </TouchableOpacity>
      <Typography
        type="title"
        style={
          title === "Политика конфиденциальности"
            ? styles.smallTitle
            : styles.title
        }
      >
        {title}
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
    marginLeft: 24,
  },
  title: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  smallTitle: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28.8,
  },
});

export default HeaderBack;
