import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Container, Header } from "shared/index";
import { ForgotPassCard } from "widgets/forgot-pass-card";
import { ForgotPassBottom } from "features/forgot-pass-content";

export const ForgotPassword = () => {
  return (
    <>
      <Header back title="Забыли пароль" />
      <Container style={styles.container}>
        <ForgotPassCard />
        <ForgotPassBottom />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
});
