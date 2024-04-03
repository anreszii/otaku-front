import { StyleSheet } from "react-native";
import React from "react";
import Typography from "ui/typography";

export const SignInTitle = () => {
  return (
    <Typography style={styles.title} variant="title-medium">
      Вход в аккаунт
    </Typography>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
    color: "#fff",
  },
});
