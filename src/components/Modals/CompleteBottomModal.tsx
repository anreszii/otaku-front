import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal } from "../ui/Modal";
import CircleProgress from "../ui/CircleProgress";
import Typography from "../ui/Typography";
import { useNavigation } from "@react-navigation/native";

export function CompleteBottomModal({ visible, setVisible }: any) {
  const navigation = useNavigation<any>();

  useEffect(() => {
    setTimeout(() => {
      if (visible) {
        setVisible(false);
        navigation.goBack();
      }
    }, 5000);
  }, [visible]);
  return (
    <Modal visible={visible} setVisible={setVisible} animationType="slide" full>
      <View style={styles.modal}>
        <View style={styles.content}>
          <Typography type="title" gradient={true} style={styles.title}>
            Congratulations!
          </Typography>
          <Typography style={styles.subtitle}>
            Ваши данные изменены, в течение нескольких секунд вы будете
            перенаправлены на главную страницу
          </Typography>
          <View style={{ width: 60, height: 60 }}>
            <CircleProgress />
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
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 32,
    width: "80%",
  },
});
