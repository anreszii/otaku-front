import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  NativeModules,
  TouchableOpacity,
  Animated,
} from "react-native";
import Typography from "../ui/Typography";
import { Search } from "../../icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
const { StatusBarManager } = NativeModules;

interface HeaderProps {
  title: string;
  style?: object;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, style, icon, onPress }) => {
  const navigation = useNavigation<any>();

  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    StatusBarManager.HEIGHT
  );

  return (
    <View
      style={{
        ...styles.container,
        ...{ top: statusBarHeight + 12 },
        ...style,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../../../assets/icon.png")}
            style={{ width: 31, height: 28, marginRight: 10 }}
            contentFit="contain"
          />
        </TouchableOpacity>
        <Typography type="title" style={styles.title}>
          {title}
        </Typography>
      </View>
      <TouchableOpacity onPress={() => onPress && onPress()}>
        {icon}
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
  smallTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28.8,
  },
});

export default Header;
