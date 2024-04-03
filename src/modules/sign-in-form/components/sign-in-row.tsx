import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Field } from "ui/field";
import Typography from "ui/typography";
import { TextInput } from "react-native-paper";
import { EyeIcon } from "src/lib/icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/lib/routes";

export const SignInRow = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Field
        placeholder="Имя пользователя"
        styleInput={styles.input}
        value={username}
        textContentType="username"
        onChangeText={(value) => setUsername(value)}
      />
      <Field
        placeholder="Пароль"
        secureTextEntry={!showPassword}
        value={password}
        textContentType="password"
        onChangeText={(value) => setPassword(value)}
        right={
          <TextInput.Icon
            icon={() => (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <EyeIcon close={!showPassword} />
              </TouchableOpacity>
            )}
          />
        }
      />
      <TouchableOpacity onPress={() => navigate("Forgot")}>
        <Typography style={styles.forgot} variant="sub-semi-bold">
          Забыли пароль?
        </Typography>
      </TouchableOpacity>
      <View style={styles.row}>
        <Typography style={styles.noAcc} variant="sub-medium">
          Еще нет аккаунта?{" "}
        </Typography>
        <TouchableOpacity onPress={() => navigate("SignUp")}>
          <Typography style={styles.signUp} variant="sub-semi-bold">
            Зарегистрируйтесь
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
  },
  input: {
    marginBottom: 12,
  },
  forgot: {
    fontSize: 16,
    letterSpacing: 0.2,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 24,
    color: "#4169E1",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    flexWrap: "wrap",
  },
  noAcc: {
    fontSize: 16,
    letterSpacing: 0.2,
    textAlign: "center",
    color: "#fff",
  },
  signUp: {
    fontSize: 16,
    letterSpacing: 0.2,
    fontWeight: "500",
    textAlign: "center",
    color: "#4169E1",
  },
});
