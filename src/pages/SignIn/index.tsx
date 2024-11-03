import React from "react";
import { Button, Field, Typography, BackButton } from "ui";
import { Layout } from "components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";

const SignIn = () => {
  const navigation = useTypedNavigation();

  const handleNavigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleNavigateForgot = () => {
    navigation.navigate("Forgot");
  };

  return (
    <Layout>
      <BackButton />
      <Typography style={styles.title} fontFamily="Montserrat">
        Вход в аккаунт
      </Typography>
      <Field style={styles.field} placeholder="Имя пользователя" />
      <Field style={styles.field} placeholder="Пароль" isPassword />
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={handleNavigateForgot}
      >
        <Typography style={styles.forgotPasswordText} fontFamily="Urbanist">
          Забыли пароль?
        </Typography>
      </TouchableOpacity>
      <View style={styles.signUp}>
        <Typography style={styles.signUpText} fontFamily="Urbanist">
          Еще нет аккаунта?
        </Typography>
        <TouchableOpacity onPress={handleNavigateSignUp}>
          <Typography style={styles.signUpButtonText} fontFamily="Urbanist">
            Зарегистрируйтесь
          </Typography>
        </TouchableOpacity>
      </View>
      <Button variant="contain" title="Войти" style={styles.button} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "500",
    marginTop: 25,
  },
  field: {
    marginTop: 25,
  },
  forgotPassword: {
    marginTop: 25,
  },
  forgotPasswordText: {
    color: "#4169E1",
    fontWeight: "500",
    fontSize: 16,
  },
  signUp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  signUpText: {
    fontWeight: "500",
    fontSize: 16,
  },
  signUpButtonText: {
    color: "#4169E1",
    fontWeight: "500",
    fontSize: 16,
  },
  button: {
    marginTop: 25,
  },
});

export default SignIn;
