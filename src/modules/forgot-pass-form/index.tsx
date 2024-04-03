import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ForgotPassRow } from "./components/forgot-pass-row";
import { Button } from "ui/button";

const ForgotPassForm = () => {
  return (
    <View>
      <ForgotPassRow />
      <Button variant="contain" title="Сбросить пароль" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "65%",
  },
});

export default ForgotPassForm;
