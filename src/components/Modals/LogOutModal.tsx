import React from "react";
import { DevSettings, StyleSheet, Text, View } from "react-native";
import { Modal } from "../ui/Modal";
import CircleProgress from "../ui/CircleProgress";
import Typography from "../ui/Typography";
import TypographyError from "../ui/TypographyError";
import Button from "../ui/Button";
import Hr from "../ui/Hr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../../api/auth/authService";
import { useTranslation } from "react-i18next";

export function LogOutModal({ visible, setVisible }: any) {
  const { t } = useTranslation();

  const handleLogOut = async () => {
    await authService.logout();
    await AsyncStorage.removeItem("token");
    DevSettings.reload();
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      animationType="slide"
      full
      close={true}
    >
      <View style={styles.modal}>
        <View style={styles.content}>
          <Typography style={styles.title} type="title">
            {t("modals.title.logout")}
          </Typography>
          <Hr />
          <Typography type="title" style={styles.subtitle}>
            {t("modals.subtitle.sureLogout")}
          </Typography>
          <View style={styles.buttonContent}>
            <Button
              title={t("buttons.cancel")}
              gradient={false}
              style={styles.buttonCancel}
              onPress={() => handleVisible()}
            />
            <Button
              title={t("buttons.logout")}
              style={styles.buttonLogout}
              onPress={() => handleLogOut()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#FFF",
    marginTop: "auto",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingBottom: 40,
    borderColor: "#373D42",
    borderWidth: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
    color: "#F75555",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    width: "80%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonCancel: {
    width: "40%",
    marginRight: 12,
  },
  buttonLogout: {
    width: "40%",
  },
});
