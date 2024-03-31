import { StyleSheet } from "react-native";
import React from "react";
import { Container, Header } from "shared/index";
import { SignUpCard } from "widgets/sign-up-card";

export const SignUp = () => {
  return (
    <>
      <Header back />
      <Container style={styles.container}>
        <SignUpCard />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
});
