import { StyleSheet } from "react-native";
import { Container, Header } from "shared/index";
import { SignInCard } from "widgets/sign-in-card";

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
