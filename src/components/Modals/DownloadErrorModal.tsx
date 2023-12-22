import { View, StyleSheet } from "react-native";
import React from "react";
import { Modal } from "../ui/Modal";
import Typography from "../ui/Typography";
import Button from "../ui/Button";

export default function DownloadErrorModal({ visible, setVisible }: any) {
  return (
    <Modal visible={visible} setVisible={setVisible} animationType="fade" full>
      <View style={styles.container}>
        <Typography type="title" gradient={true} style={styles.title}>
          Произошла ошибка
        </Typography>
        <Typography style={styles.subtitle}>
          Попробуйте повторить попытку через несколько секунд
        </Typography>
        <View style={{ width: 200, height: 60 }}>
          <Button title="Закрыть" onPress={() => setVisible(false)} />
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
    borderRadius: 10,
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
