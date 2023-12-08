import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import React from "react";
import Button from "../components/ui/Button";
import Typography from "../components/ui/Typography";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
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
          <SafeAreaView style={{ alignItems: "center" }}>
            <Typography type="title" style={styles.title}>
              Welcome to AniUp
            </Typography>
            <Typography type="sub" style={styles.subtitle}>
              The best streaming anime app of the{"\n"} century to entertain you
              every day
            </Typography>
            <Button
              onPress={() => navigation.navigate("SignIn")}
              title="Get Started"
              style={{ marginBottom: 24 }}
            />
          </SafeAreaView>
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
});
