import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Typography from "../ui/Typography";
import { LinearGradient } from "expo-linear-gradient";
import Vr from "../ui/Vr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from "../../plugins/i18n";
const { StatusBarManager } = NativeModules;

interface HeaderProps {
  style?: ViewStyle;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderLang: React.FC<HeaderProps> = ({ style, lang, setLang }) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(
    StatusBarManager.HEIGHT
  );

  const handleLang = async (lang: string) => {
    setLang(lang);
    i18n.changeLanguage(lang === "russian" ? "ru" : "en");
  };

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["#7210FF", "#9D59FF"]}
      style={{
        ...styles.container,
        ...{ top: statusBarHeight + 12 },
        ...style,
      }}
    >
      <TouchableOpacity onPress={() => handleLang("russian")}>
        <Typography
          style={{ ...styles.ruLang, fontSize: lang === "russian" ? 20 : 16 }}
          type="bold"
        >
          ru
        </Typography>
      </TouchableOpacity>
      <Vr />
      <TouchableOpacity onPress={() => handleLang("english")}>
        <Typography
          style={{ ...styles.enLang, fontSize: lang === "english" ? 20 : 16 }}
          type="bold"
        >
          en
        </Typography>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    zIndex: 1000,
    right: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  ruLang: {
    padding: 7,
    color: "#FFF",
    fontWeight: "bold",
    lineHeight: 22.4,
    letterSpacing: 0.2,
  },
  enLang: {
    padding: 7,
    color: "#FFF",
    fontWeight: "bold",
    lineHeight: 22.4,
    letterSpacing: 0.2,
  },
});

export default HeaderLang;
