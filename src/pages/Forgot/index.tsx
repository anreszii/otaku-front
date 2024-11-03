import { StyleSheet } from "react-native";
import React from "react";
import { Layout } from "components";
import { BackButton, Button, Field, Typography } from "ui";

const Forgot = () => {
  return (
    <Layout style={styles.layout}>
      <BackButton />
      <Typography fontFamily="Montserrat" style={styles.title}>
        Забыли пароль?
      </Typography>
      <Field placeholder="Электронная почта" />
      <Button variant="contain" title="Сбросить пароль" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    gap: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
  },
});

export default Forgot;
