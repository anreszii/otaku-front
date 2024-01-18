import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import HeaderBack from "../components/Layouts/HeaderBack";
import Typography from "../components/ui/Typography";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBack title={t("headerTitles.privacyPolicy")} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Typography style={styles.contentTitle} type="title">
            {t("screens.privacyPolicy.oneTitle")}
          </Typography>
          <Typography style={styles.contentSubtitle} type="regular">
            {t("screens.privacyPolicy.oneSubtitle")}
          </Typography>
        </View>
        <View style={styles.content}>
          <Typography style={styles.contentTitle} type="title">
            {t("screens.privacyPolicy.twoTitle")}
          </Typography>
          <Typography style={styles.contentSubtitle} type="regular">
            {t("screens.privacyPolicy.twoSubtitle")}
          </Typography>
        </View>
        <View style={styles.content}>
          <Typography style={styles.contentTitle} type="title">
            {t("screens.privacyPolicy.threeTitle")}
          </Typography>
          <Typography style={styles.contentSubtitle} type="regular">
            {t("screens.privacyPolicy.threeSubtitle")}
          </Typography>
        </View>
        <View style={styles.content}>
          <Typography style={styles.contentTitle} type="title">
            {t("screens.privacyPolicy.fourTitle")}
          </Typography>
          <Typography style={styles.contentSubtitle} type="regular">
            {t("screens.privacyPolicy.fourSubtitle")}
          </Typography>
        </View>
        <View style={styles.contentLast}>
          <Typography style={styles.contentSubtitle} type="regular">
            {t("screens.privacyPolicy.five")}
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    marginTop: 48,
    marginHorizontal: 24,
  },
  content: {
    marginTop: 24,
  },
  contentLast: {
    marginTop: 24,
    marginBottom: 48,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  contentSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    marginTop: 24,
  },
});
