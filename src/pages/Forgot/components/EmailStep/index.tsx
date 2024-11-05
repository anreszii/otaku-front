import React from "react";
import { StyleSheet } from "react-native";
import { BackButton, Button, Field, Typography } from "ui";
import Animated, { SlideOutLeft } from "react-native-reanimated";

interface EmailStepProps {
  email: string;
  error: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
}

export const EmailStep = ({
  email,
  error,
  isLoading,
  onEmailChange,
  onSubmit,
}: EmailStepProps) => (
  <Animated.View exiting={SlideOutLeft.duration(300)} style={styles.layout}>
    <BackButton />
    <Typography fontFamily="Montserrat" style={styles.title}>
      Забыли пароль?
    </Typography>
    <Field
      placeholder="Электронная почта"
      value={email}
      onChangeText={onEmailChange}
      errorText={error}
      errorTextStyle={{ marginTop: -12.5 }}
    />
    <Button
      variant="contain"
      title="Сбросить пароль"
      onPress={onSubmit}
      isLoading={isLoading}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  layout: {
    gap: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
  },
});
