import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Typography from "shared/ui/typography";

export const SignInHeader = () => {
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
