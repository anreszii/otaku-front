import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Button from "../components/ui/Button";
import Typography from "../components/ui/Typography";
import { StackActions, useNavigation } from "@react-navigation/native";
import Container from "../components/Layouts/Container";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import HeaderLang from "../components/Layouts/HeaderLang";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Welcome() {
  const navigation = useNavigation<any>();
  const [lang, setLang] = useState<string>("russian");

  const getStarted = async () => {
    await AsyncStorage.setItem("lang", lang);
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <HeaderLang lang={lang} setLang={setLang} />
      <ImageBackground
        contentFit="cover"
        style={styles.imageBackground}
        source={require("../../assets/welcome_back.png")}
      >
        <ImageBackground
          source={require("../../assets/welcome_dark.png")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.content}>
            <Typography type="title" style={styles.title}>
              Welcome to AniUp
            </Typography>
            <Typography type="sub" style={styles.subtitle}>
              The best streaming anime app of the{"\n"} century to entertain you
              every day
            </Typography>
            <Button
              onPress={() => getStarted()}
              title="Get Started"
              style={{ marginBottom: 24 }}
            />
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    backgroundColor: "#181A20",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  title: {
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 48,
    color: "#FFF",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 25.2,
    letterSpacing: 0.2,
    color: "#FFF",
    marginBottom: 24,
  },
  content: {
    alignItems: "center",
    marginBottom: 24,
    marginRight: 24,
    marginLeft: 24,
  },
});
