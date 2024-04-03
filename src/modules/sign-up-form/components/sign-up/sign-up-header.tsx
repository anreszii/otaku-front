import { StyleSheet } from "react-native";
import React from "react";
import Typography from "ui/typography";

export const SignUpHeader = () => {
  return (
    <Typography style={styles.title} variant="title-medium">
      Создать аккаунт
    </Typography>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
    color: "#fff",
    marginTop: 48,
  },
});
