import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { WelcomeContent } from "features/welcome-content";

export const WelcomeCard = () => {
  return (
    <View style={styles.welcomeContainer}>
      <WelcomeContent />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    width: "90%",
    backgroundColor: "#2B3033",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "rgba(238, 238, 238, 0.1)",
    paddingTop: 20,
    paddingHorizontal: 5,
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
    paddingBottom: 35,
  },
});
