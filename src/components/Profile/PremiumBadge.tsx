import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Typography from "../ui/Typography";
import { ArrowGradient } from "../../icons";
import { useNavigation } from "@react-navigation/native";

export default function PremiumBadge() {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Premium")}
    >
      <View style={styles.titleContent}>
        <Typography gradient={true} style={styles.title} type="title">
          Join Premium!
        </Typography>
        <Typography style={styles.subtitle}>
          Enjoy watching Full-HD animes, without restrictions and without ads
        </Typography>
      </View>
      <ArrowGradient width={11} height={15} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderColor: "#7210FF",
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleContent: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.2,
    color: "#616161",
  },
});
