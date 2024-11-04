import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Typography, PosterBackground } from "ui";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";

const Welcome = () => {
  const { navigate } = useTypedNavigation();

  return (
    <PosterBackground>
      <View style={styles.welcomeContainer}>
        <View style={styles.content}>
          <Typography style={styles.welcomeTitle}>
            Добро пожаловать в Otaku
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
    </PosterBackground>
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
    backgroundColor: "#2E2F3A",
    borderRadius: 12,
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
