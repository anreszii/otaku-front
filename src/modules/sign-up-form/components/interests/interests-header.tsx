import { StyleSheet } from "react-native";
import React from "react";
import Typography from "ui/typography";

export const InterestsHeader = () => {
  return (
    <Typography style={styles.title} variant="title-medium">
      Выберите свои интересы и получите лучшие рекомендации по аниме
    </Typography>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.2,
    color: "#fff",
    marginTop: 12,
    marginBottom: 24,
  },
});
