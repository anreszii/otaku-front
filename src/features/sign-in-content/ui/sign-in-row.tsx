import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Field } from "shared/ui/field";
import Typography from "shared/ui/typography";

export const SignInRow = () => {
  return (
    <View style={styles.container}>
      <Field placeholder="Имя пользователя" styleInput={styles.input} />
      <Field placeholder="Пароль" />
      <TouchableOpacity>
        <Typography style={styles.forgot} variant="sub-medium">
          Забыли пароль?
        </Typography>
      </TouchableOpacity>
      <View style={styles.row}>
        <Typography style={styles.noAcc} variant="sub-medium">
          Еще нет аккаунта?{" "}
        </Typography>
        <TouchableOpacity>
          <Typography style={styles.signUp} variant="sub-medium">
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
    marginTop: 12,
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
