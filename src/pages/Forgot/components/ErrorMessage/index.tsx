import React from "react";
import { StyleSheet } from "react-native";
import { Typography } from "ui";

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <Typography style={styles.error} fontFamily="Montserrat">
    {error}
  </Typography>
);

const styles = StyleSheet.create({
  error: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FF3333",
    marginBottom: 15,
  },
});
