import { Container } from "components/layouts/container";
import { Header } from "components/layouts/header";
import { ForgotPassCard } from "modules/forgot-pass-form/components";
import { View, Text, StyleSheet } from "react-native";

export const ForgotPassword = () => {
  return (
    <>
      <Header back title="Забыли пароль" />
      <Container style={styles.container}>
        <ForgotPassCard />
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
