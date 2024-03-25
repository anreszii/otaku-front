import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Button from "@/components/ui/Button";
import { ImageBackground } from "expo-image";
import Overlay from "@/components/ui/Overlay";
import Typography from "@/components/ui/Typography";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TypeRootStackParamList } from "@/navigation/navigation.types";

const Welcome = () => {
  const { navigate } = useNavigation<NavigationProp<TypeRootStackParamList>>();

  return (
    <ImageBackground
      source={require("assets/backgroundOnboarding.png")}
      style={styles.container}
    >
      <Overlay />
      <View style={styles.welcomeContainer}>
        <View style={styles.content}>
          <Typography style={styles.welcomeTitle}>
            Добро пожаловать в AniUp
          </Typography>
          <Typography style={styles.welcomeSubtitle}>
            Лучшее потоковое аниме-приложение века, которое будет развлекать вас
            каждый день
          </Typography>
          <Button
            variant="contain"
            title="Создать аккаунт"
            onPress={() => navigate("SignUp")}
          />
          <Button
            variant="gradient"
            title="Войти"
            onPress={() => navigate("SignIn")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181A20",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  welcomeContainer: {
    width: "90%",
    backgroundColor: "#2B3033",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "rgba(238, 238, 238, 0.1)",
    paddingTop: 20,
    paddingHorizontal: 5,
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
    paddingBottom: 35,
  },
  content: {
    width: "80%",
    gap: 12,
  },
  welcomeTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 12,
  },
});

export default Welcome;
