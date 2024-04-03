import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FillAvatar } from "modules/sign-up-form/components/fill-profile/fill-avatar";
import { Content } from "components/layouts/content";
import { FillRow } from "modules/sign-up-form/components/fill-profile/fill-row";

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
