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
  SafeAreaView,
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

const HeaderTest: React.FC<HeaderProps> = ({ title, style, icon, onPress }) => {
  const navigation = useNavigation<any>();

  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    StatusBarManager.HEIGHT
  );

  return (
    <SafeAreaView>
      <View
        style={{
          ...styles.container,
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
});

export default HeaderTest;
