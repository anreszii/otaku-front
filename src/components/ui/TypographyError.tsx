import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Typography from "./Typography";

export default function TypographyError({ error, ...props }: any) {
  return (
    <View {...props}>
      <Typography style={styles.text} type="medium">
        {error}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20.6,
    letterSpacing: 0.2,
    color: "#FF3333",
  },
});
