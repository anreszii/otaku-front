import React from "react";
import { StyleSheet } from "react-native";
import { Button, Field, Typography } from "ui";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

interface PasswordStepProps {
  password: string;
  error: string;
  isLoading: boolean;
  onPasswordChange: (password: string) => void;
  onSubmit: () => void;
}

export const PasswordStep = ({
  password,
  error,
  isLoading,
  onPasswordChange,
  onSubmit,
}: PasswordStepProps) => (
  <Animated.View
    entering={SlideInRight.duration(300)}
    exiting={SlideOutLeft.duration(300)}
  >
    <Typography fontFamily="Montserrat" style={styles.subtitle}>
      Введите новый пароль
    </Typography>
    <Field
      placeholder="Новый пароль"
      value={password}
      onChangeText={onPasswordChange}
      isPassword
      style={styles.field}
      errorText={error}
      errorTextStyle={{ marginTop: -12.5 }}
    />
    <Button
      variant="contain"
      title="Сохранить"
      onPress={onSubmit}
      isLoading={isLoading}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  field: {
    marginBottom: 25,
  },
});
