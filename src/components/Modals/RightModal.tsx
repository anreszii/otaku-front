import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { FC } from "react";
import { Modal } from "../ui/Modal";

interface RightModalProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
}

const RightModal: FC<RightModalProps> = ({
  children,
  visible,
  setVisible,
  fullScreen,
}) => {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      animationType="fade"
      close={true}
      full
    >
      <SafeAreaView
        style={[styles.modal, fullScreen ? { width: "33%" } : { width: "50%" }]}
      >
        {children}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: "100%",
    backgroundColor: "#1F222A",
    marginLeft: "auto",
  },
});

export default RightModal;
