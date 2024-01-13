import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBack from "../components/Layouts/HeaderBack";
import { backgroundColors } from "../constants/colors";
import Typography from "../components/ui/Typography";
import RadioButton from "../components/ui/RadioButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

const Language = ({ route }: any) => {
  const [checked, setChecked] = useState<string | null>("english");

  useEffect(() => {
    (async () => {
      const lang = await AsyncStorage.getItem("lang");
      setChecked(lang);
    })();
  }, [route]);

  const handleChangeLanguage = async (value: string) => {
    setChecked(value);
    await AsyncStorage.setItem("lang", value);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBack title="Language" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.languageContent}
          onPress={() => handleChangeLanguage("english")}
          disabled={checked === "english" ? true : false}
        >
          <Typography style={styles.languageTitle}>English</Typography>
          <RadioButton
            checked={checked === "english" ? true : false}
            onPress={() => handleChangeLanguage("english")}
            disabled={checked === "english" ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageContent}
          onPress={() => handleChangeLanguage("russian")}
          disabled={checked === "russian" ? true : false}
        >
          <Typography style={styles.languageTitle}>Russian</Typography>
          <RadioButton
            checked={checked === "russian" ? true : false}
            onPress={() => handleChangeLanguage("russian")}
            disabled={checked === "russian" ? true : false}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: backgroundColors.backgroundLight,
  },
  container: {
    marginTop: 32,
    marginHorizontal: 24,
    marginBottom: 72,
  },
  languageContent: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25.2,
    letterSpacing: 0.2,
  },
});

export default Language;
