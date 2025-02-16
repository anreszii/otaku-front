import React, { useState } from "react";
import { Button, Field, Typography, BackButton } from "ui";
import { Layout } from "components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTypedNavigation } from "shared/hooks";
import useAuthStore from "shared/stores/authStore";
import DeviceInfo from "react-native-device-info";

const SignIn = () => {
  const navigation = useTypedNavigation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuthStore();

  const handleNavigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleNavigateForgot = () => {
    navigation.navigate("Forgot");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    const deviceId = await DeviceInfo.getUniqueId();
    const error = await login({ username, password, deviceId });
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <BackButton />
      <Typography style={styles.title} fontFamily="Montserrat">
        Вход в аккаунт
      </Typography>
      <Field
        style={styles.field}
        placeholder="Имя пользователя"
        value={username}
        onChangeText={setUsername}
      />
      <Field
        style={styles.field}
        placeholder="Пароль"
        isPassword
        value={password}
        onChangeText={setPassword}
        errorText={error}
      />
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={handleNavigateForgot}
        activeOpacity={0.7}
      >
        <Typography style={styles.forgotPasswordText} fontFamily="Urbanist">
          Забыли пароль?
        </Typography>
      </TouchableOpacity>
      <View style={styles.signUp}>
        <Typography style={styles.signUpText} fontFamily="Urbanist">
          Еще нет аккаунта?
        </Typography>
        <TouchableOpacity activeOpacity={0.7} onPress={handleNavigateSignUp}>
          <Typography style={styles.signUpButtonText} fontFamily="Urbanist">
            Зарегистрируйтесь
          </Typography>
        </TouchableOpacity>
      </View>
      <Button
        variant="contain"
        title="Войти"
        style={styles.button}
        onPress={handleLogin}
        isLoading={isLoading}
      />
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
    color: "#1A80E5",
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
    color: "#1A80E5",
    fontWeight: "500",
    fontSize: 16,
  },
  button: {
    marginTop: 25,
  },
});

export default SignIn;
