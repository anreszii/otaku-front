import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FillAvatar, FillRow } from "features/sign-up-content";
import { Content } from "shared/index";

export const FillProfileCard = () => {
  return (
    <View style={styles.container}>
      <FillAvatar />
      <Content style={styles.content}>
        <FillRow />
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "60%",
  },
  content: {
    marginTop: "auto",
    marginBottom: "auto",
  },
});
