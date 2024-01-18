import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Modal } from "../ui/Modal";
import Typography from "../ui/Typography";
import CircleProgress from "../ui/CircleProgress";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function CompleteModal({ visible, setVisible, redirect }: any) {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      if (visible) {
        setVisible(false);
        navigation.navigate(redirect);
      }
    }, 5000);
  }, [visible]);

  return (
    <Modal visible={visible} setVisible={setVisible} animationType="fade" full>
      <View style={styles.container}>
        <Typography type="title" gradient={true} style={styles.title}>
          {t("modals.title.congratulations")}
        </Typography>
        <Typography style={styles.subtitle} type="regular">
          {t("modals.subtitle.complete")}
        </Typography>
        <View style={{ width: 60, height: 60 }}>
          <CircleProgress />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
    alignSelf: "center",
    justifySelf: "center",
    borderColor: "#373D42",
    borderWidth: 1,
    borderRadius: 25,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 32,
  },
});
