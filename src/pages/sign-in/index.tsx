import { Container } from "components/layouts/container";
import { Header } from "components/layouts/header";
import { SignInCard } from "modules/sign-in-form/components";
import { StyleSheet } from "react-native";

export const SignIn = () => {
  return (
    <>
      <Header back />
      <Container style={styles.container}>
        <SignInCard />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    marginBottom: 24,
  },
});
